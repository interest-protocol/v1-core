/*

▀█▀ █▀▀▄ ▀▀█▀▀ █▀▀ █▀▀█ █▀▀ █▀▀ ▀▀█▀▀ 　 ▒█▀▄▀█ █▀▀█ █▀▀█ █░█ █▀▀ ▀▀█▀▀ 　 ▒█░░▒█ ▄█░ 
▒█░ █░░█ ░░█░░ █▀▀ █▄▄▀ █▀▀ ▀▀█ ░░█░░ 　 ▒█▒█▒█ █▄▄█ █▄▄▀ █▀▄ █▀▀ ░░█░░ 　 ░▒█▒█░ ░█░ 
▄█▄ ▀░░▀ ░░▀░░ ▀▀▀ ▀░▀▀ ▀▀▀ ▀▀▀ ░░▀░░ 　 ▒█░░▒█ ▀░░▀ ▀░▀▀ ▀░▀ ▀▀▀ ░░▀░░ 　 ░░▀▄▀░ ▄█▄

Copyright (c) 2021 Jose Cerqueira - All rights reserved

*/

//SPDX-License-Identifier: MIT
pragma solidity 0.8.12;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/utils/math/SafeCastUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";

import "../interfaces/IPancakeRouter02.sol";
import "../interfaces/IPancakePair.sol";
import "../interfaces/IVToken.sol";
import "../interfaces/IVBNB.sol";
import "../interfaces/IVenusController.sol";

import "../tokens/Dinero.sol";

import "../lib/Rebase.sol";
import "../lib/IntMath.sol";
import "../lib/IntERC20.sol";

import "../OracleV1.sol";

import "./DineroMarket.sol";

/**
 * @dev It is an overcollaterized isolated lending market between an underlying Venus Token and the synthetic stable coin Dinero.
 * The idea behind a synthethic stable coin is to allow for a fixed low interest rate to make investment strategies built with Interest Protocol cheaper and predictable.
 *
 * @notice The `msg.sender` must give an allowance to deposit to this contract.
 * @notice There is no deposit fee.
 * @notice There is a liquidation fee.
 * @notice Since Dinero is assumed to always be pegged to USD. Only need an exchange rate from collateral to USD.
 * @notice We assume that {_exchangeRate} has 18 decimals. Please check OracleV1 and PancakeOracle
 * @notice The govenor owner has sole access to critical functions in this contract.
 * @notice We will start by supporting tokens with high liquidity. The {maxLTVRatio} will start at 60% and slow be raised up to 80%.
 * @notice It relies on third party liquidators to close loans underwater.
 * @notice It depends on Chainlink price feeds oracles. However, we will add a backup using PCS TWAPS before the live release.
 * @notice The Rebase library is helper library to easily calculate the principal + fees owed by borrowers.
 * @notice To be effective this requires a strong DNR/BNB or DNR/BUSD pair. The contract CasaDePapel will be responsible for this.
 * @notice This contract enforces that Dinero remains pegged to USD.
 * If Dinero falls below, borrowers that have open  loans and swapped to a different crypto, can buy dinero cheaper and close their loans running a profit. Liquidators can accumulate Dinero to close underwater positions with an arbitrate. As liquidation will always assume 1 Dinero is worth 1 USD. If Dinero goes above a dollar, people are encouraged to borrow more Dinero for arbitrage. We believe this will keep the price pegged at 1 USD.
 *
 * This contract that will support:
 * NATIVE BNB - 18 decimals
 */
contract InterestBNBBearingMarket is Initializable, DineroMarket {
    /*///////////////////////////////////////////////////////////////
                            LIBRARIES
    //////////////////////////////////////////////////////////////*/

    using RebaseLibrary for Rebase;
    using SafeERC20Upgradeable for IERC20Upgradeable;
    using SafeCastUpgradeable for uint256;
    using IntMath for uint256;
    using IntERC20 for address;

    /*///////////////////////////////////////////////////////////////
                            EVENTS
    //////////////////////////////////////////////////////////////*/

    event AddCollateral(
        address indexed from,
        uint256 indexed underlyingAmount,
        uint256 vTokenAmount
    );

    event WithdrawCollateral(
        address indexed from,
        uint256 indexed underlyingAmount,
        uint256 vTokenAmount
    );

    /*///////////////////////////////////////////////////////////////
                            STATE
    //////////////////////////////////////////////////////////////*/

    // Compound and by extension Venus return 0 on successful calls.
    uint256 private constant NO_ERROR = 0;

    /**
     * @dev This is the Venus controller 0xfD36E2c2a6789Db23113685031d7F16329158384
     */
    // solhint-disable-next-line var-name-mixedcase
    IVenusController public VENUS_CONTROLLER;

    // solhint-disable-next-line var-name-mixedcase
    IERC20Upgradeable public XVS; // Venus Token.

    // solhint-disable-next-line var-name-mixedcase
    IVToken public VTOKEN; // A Venus Market.

    // Total amount of deposited underlying converted into vToken.
    uint256 public totalVCollateral;

    // Total Amount of XVS earned per VToken.
    uint256 public totalRewardsPerVToken;

    // USER -> Rewards per VToken.
    mapping(address => uint256) public rewardsOf;

    /*///////////////////////////////////////////////////////////////
                                INITIALIZER
    //////////////////////////////////////////////////////////////*/

    /**
     * @dev This will only be called once to set the initial state.
     *
     * @notice A `Collateral` of address(0) represents BNB.
     *
     * @param router The address of the PCS router.
     * @param dinero The address of Dinero.
     * @param feeTo Treasury address.
     * @param oracle The address of the oracle.
     * @param venusController The address of Venus Controller
     * @param xvs the address of the Venus token.
     * @param vToken The address of the `collateral` vToken
     * @param interestRate the interest rate charged every second
     * @param _maxLTVRatio The maximum ltv ratio before liquidation
     * @param _liquidationFee The fee charged when positions under water are liquidated
     *
     * Requirements:
     *
     * - Can only be called at once and should be called during creation to prevent front running.
     */
    function initialize(
        IPancakeRouter02 router,
        Dinero dinero,
        address feeTo,
        OracleV1 oracle,
        IVenusController venusController,
        IERC20Upgradeable xvs,
        IVToken vToken,
        uint64 interestRate,
        uint256 _maxLTVRatio,
        uint256 _liquidationFee
    ) external initializer {
        // {maxLTVRatio} must be within the acceptable bounds.
        require(
            0.9e18 >= _maxLTVRatio && _maxLTVRatio >= 0.5e18,
            "DM: ltc ratio out of bounds"
        );

        __DineroMarket_init();

        ROUTER = router;
        DINERO = dinero;
        FEE_TO = feeTo;
        ORACLE = oracle;
        VENUS_CONTROLLER = venusController;
        XVS = xvs;
        VTOKEN = vToken;
        loan.INTEREST_RATE = interestRate;
        maxLTVRatio = _maxLTVRatio;
        liquidationFee = _liquidationFee;
    }

    /*///////////////////////////////////////////////////////////////
                        MUTATIVE PUBLIC FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    /**
     * @dev This function gets the latest exchange rate of a {VTOKEN} in USD from chainlink.
     *
     * @notice Supports for PCS TWAPS will be added before release as a back up.
     *
     * @return rate The latest exchange rate from Chainlink
     *
     * Requirements:
     *
     * - ` rate has to be above 0.
     */
    function updateExchangeRate()
        public
        override(DineroMarket)
        returns (uint256 rate)
    {
        uint256 one = 1 ether;
        uint256 underlyingAmount = one.bmul(VTOKEN.exchangeRateCurrent());

        // Get USD price for 1 VToken (18 decimals). The USD price also has 18 decimals. We need to reduce
        rate = ORACLE.getBNBUSDPrice(underlyingAmount);

        require(rate > 0, "DM: invalid exchange rate");

        // if the exchange rate is different we need to update the global state
        if (rate != exchangeRate) {
            exchangeRate = rate;
            emit ExchangeRate(rate);
        }
    }

    /**
     * @dev Allows `msg.sender` to add collateral. It will send the rewards in XVS if applicable.
     *
     * @notice If the `COLLATERAL` is an ERC20, the `msg.sender` must approve this contract. If it is BNB, he can send directly.
     */
    function addCollateral() external payable {
        // Update rewards.
        _claimVenus();

        // Save gas
        uint256 _userCollateral = userCollateral[_msgSender()];
        uint256 _totalRewardsPerVToken = totalRewardsPerVToken;

        uint256 rewards;

        // If the user has a deposit, he is entitled to rewards.
        if (_userCollateral > 0) {
            rewards =
                _totalRewardsPerVToken.mulDiv(
                    _userCollateral,
                    10**address(VTOKEN).safeDecimals()
                ) -
                rewardsOf[_msgSender()];
        }

        uint256 vTokenAmount;
        uint256 underlyingAmount;

        // Supply BNB
        vTokenAmount = _mintBNBVToken(msg.value);
        underlyingAmount = msg.value;

        uint256 newAmount = _userCollateral + vTokenAmount;

        // Update Global state
        userCollateral[_msgSender()] = newAmount;
        totalVCollateral += vTokenAmount;

        // User has been paid all rewards.
        rewardsOf[_msgSender()] = _totalRewardsPerVToken.mulDiv(
            newAmount,
            10**address(VTOKEN).safeDecimals()
        );

        // Send the rewards.
        _transferXVS(_msgSender(), rewards);

        emit AddCollateral(_msgSender(), underlyingAmount, vTokenAmount);
    }

    /**
     * @dev Functions allows the `msg.sender` to remove his collateral as long as he remains solvent.
     *
     * @notice This function can fail if Venus does not have enough cash.
     *
     * @param amount The number of VToken the `msg.sender` wishes to withdraw.
     * @param inUnderlying If true it will redeem the underlying and send. Note: it can fail.
     *
     * Requirements:
     *
     * - `msg.sender` must remain solvent after removing the collateral.
     */
    function withdrawCollateral(uint256 amount, bool inUnderlying)
        external
        isSolvent
    {
        // Update how much is owed to the protocol before allowing collateral to be removed
        accrue();

        // Update rewards.
        _claimVenus();

        // Save gas
        uint256 _userCollateral = userCollateral[_msgSender()];
        uint256 _totalRewardsPerVToken = totalRewardsPerVToken;

        uint256 rewards = _totalRewardsPerVToken.mulDiv(
            _userCollateral,
            10**address(VTOKEN).safeDecimals()
        ) - rewardsOf[_msgSender()];

        uint256 newAmount = _userCollateral - amount;

        // Update State
        userCollateral[_msgSender()] = newAmount;
        totalVCollateral -= amount;
        rewardsOf[_msgSender()] = _totalRewardsPerVToken.mulDiv(
            newAmount,
            10**address(VTOKEN).safeDecimals()
        );

        // If the person withdrawing wants the vTokens, we do not need to redeem the underlying.
        if (!inUnderlying) {
            // Send the collateral
            IERC20Upgradeable(address(VTOKEN)).safeTransfer(
                _msgSender(),
                amount
            );

            // Send the rewards.
            _transferXVS(_msgSender(), rewards);

            // 0 represents that vTokens were withdrawn.
            emit WithdrawCollateral(_msgSender(), 0, amount);
            return;
        }

        // How much underlying was redeemed.
        uint256 underlyingAmount;

        // Redeem and send BNB
        underlyingAmount = _redeemBNBVToken(amount);
        _sendBNB(payable(_msgSender()), underlyingAmount);

        // Send the rewards.
        _transferXVS(_msgSender(), rewards);

        emit WithdrawCollateral(_msgSender(), underlyingAmount, amount);
    }

    /**
     * @dev We need to be able to receive BNB after redeeming from vBNB.
     */
    receive() external payable {
        // Only accept BNB from vBNB.
        if (_msgSender() != address(VTOKEN)) revert("DM: not allowed");
    }

    /**
     * @dev This function closes underwater positions. It charges the borrower a fee and rewards the liquidator for keeping the integrity of the protocol
     *
     * @notice Liquidator can use collateral to close the position or must have enough dinero in this account.
     * @notice Liquidators can only close a portion of an underwater position.
     * @notice We do not require the  liquidator to use the collateral. If there are any "lost" tokens in the contract. Those can be use as well.
     * @notice The liquidator must have more than the sum of principals in Dinero because of the fees accrued over time. Unless he chooses to use the collateral to cover the positions.
     * @notice We assume PCS will remain most liquid exchange in BSC for this version of the contract. We will also add liquidate of BNB/DNR to PCS.
     * @notice If `inUnderlying` is true, it is possible that this function will fail as Venus might be out of cash.
     *
     * @param accounts The  list of accounts to be liquidated.
     * @param principals The amount of principal the `msg.sender` wants to liquidate for each account.
     * @param recipient The address that will receive the proceeds gained by liquidating.
     * @param inUnderlying The liquidator can choose to receive the vTokens directly or in underlying.
     * @param path The list of tokens from collateral to dinero in case the `msg.sender` wishes to use collateral to cover the debt.
     *
     * Requirements:
     *
     * - If the liquidator wishes to use collateral to pay off a debt. He must exchange it to Dinero.
     * - He must hold enough Dinero to cover the sum of principals if opts to not sell the collateral in PCS to avoid slippage costs.
     */
    function liquidate(
        address[] calldata accounts,
        uint256[] calldata principals,
        address recipient,
        bool inUnderlying,
        address[] calldata path
    ) external {
        if (path.length > 0) {
            // Make sure the token is always exchanged to Dinero as we need to burn at the end.
            // path can be empty if the liquidator has enough dinero in his accounts to close the positions.
            require(
                path[path.length - 1] == address(DINERO),
                "DM: no dinero at last index"
            );
            require(inUnderlying, "DM: cannot sell VTokens");
            require(path[0] != address(XVS), "DM: not allowed to sell XVS");
        }

        // Liquidations must be based on the current exchange rate.
        uint256 _exchangeRate = updateExchangeRate();

        // Update all debt
        accrue();

        // Update rewards.
        _claimVenus();

        // Save state to memory for gas saving
        LiquidationInfo memory liquidationInfo;

        Rebase memory _totalLoan = totalLoan;

        uint256 _liquidationFee = liquidationFee;

        uint256 totalUnderlyingAmount;

        // Loop through all positions
        for (uint256 i = 0; i < accounts.length; i++) {
            address account = accounts[i];

            // If the user has enough collateral to cover his debt. He cannot be liquidated. Move to the next one.
            if (_isSolvent(account, _exchangeRate)) continue;

            uint256 principal;

            {
                // How much principal the user has borrowed.
                uint256 loanPrincipal = userLoan[account];

                // Liquidator cannot repay more than the what `account` borrowed.
                // Note the liquidator does not need to close the full position.
                principal = principals[i] > loanPrincipal
                    ? loanPrincipal
                    : principals[i];

                // Update the userLoan global state
                userLoan[account] -= principal;
            }

            // How much is owed in principal + accrued fees
            uint256 debt = _totalLoan.toElastic(principal, false);
            // Calculate the collateralFee (for the liquidator and the protocol)
            uint256 fee = debt.bmul(_liquidationFee);

            // How much collateral is needed to cover the loan + fees.
            // Since Dinero is always USD we can calculate this way.
            uint256 collateralToCover = (debt + fee).bdiv(_exchangeRate);

            // on very low values due to math restrictions this can be 0.
            require(collateralToCover > 0, "DM: principal too low");

            {
                // Save Gas
                uint256 _totalRewardsPerVToken = totalRewardsPerVToken;
                uint256 _userCollateral = userCollateral[account];
                uint256 decimalsFactor = 10**address(VTOKEN).safeDecimals();

                // How many rewards the user is entitled.
                uint256 rewards = _totalRewardsPerVToken.mulDiv(
                    _userCollateral,
                    decimalsFactor
                ) - rewardsOf[account];

                // New balance after being liquidated
                uint256 newAmount = _userCollateral - collateralToCover;

                // Remove the collateral from the account. We can consider the debt paid.
                userCollateral[account] = newAmount;
                // We consider that all rewards have been paid.
                rewardsOf[account] = _totalRewardsPerVToken.mulDiv(
                    newAmount,
                    decimalsFactor
                );
                // Send the rewards.
                _transferXVS(account, rewards);
            }

            uint256 underlyingAmount;
            // If the liquidator wishes to receive his reward in underlying, we need to redeem.
            if (inUnderlying) {
                underlyingAmount = _redeemBNBVToken(collateralToCover);
            }

            emit WithdrawCollateral(
                account,
                underlyingAmount,
                collateralToCover
            );
            emit Repay(_msgSender(), account, principal, debt);

            // Update local information. It should not overflow max uint128.
            liquidationInfo.allCollateral += collateralToCover.toUint128();
            liquidationInfo.allPrincipal += principal.toUint128();
            liquidationInfo.allDebt += debt.toUint128();
            liquidationInfo.allFee += fee.toUint128();
            totalUnderlyingAmount += underlyingAmount;
        }

        // There must have liquidations or we throw an error;
        // We throw an error instead of returning because we already changed state, sent events and withdrew tokens from collateral.
        // We need to revert all that.
        require(liquidationInfo.allPrincipal > 0, "DM: no liquidations");

        // If the there is no more open positions, the elastic should also equal to 0.
        // Due to limits of math in solidity. elastic might end up with dust.
        if (liquidationInfo.allPrincipal == _totalLoan.base)
            liquidationInfo.allDebt = _totalLoan.elastic;

        // Update Global state
        totalLoan = _totalLoan.sub(
            liquidationInfo.allPrincipal,
            liquidationInfo.allDebt
        );

        // Update the total collateral.
        totalVCollateral -= liquidationInfo.allCollateral;

        // 10% of the liquidation fee to be given to the protocol.
        uint256 protocolFee = uint256(liquidationInfo.allFee).bmul(0.1e18);

        unchecked {
            // Should not overflow.
            // Pay the fee to the protocol
            loan.feesEarned += protocolFee.toUint128();
        }

        // If a path is provided, we will use the collateral in Underlying to cover the debt.
        if (path.length >= 2) {
            // Sell `COLLATERAL` and send `DINERO` to recipient.
            // Sell all collateral in underlying

            ROUTER.swapExactETHForTokens{value: totalUnderlyingAmount}(
                // Minimum amount to cover the collateral
                0,
                // Sell COLLATERAL -> DINERO
                path,
                // Send DINERO to the recipient. Since this has to happen in this block. We can burn right after
                recipient,
                // This TX must happen in this block.
                //solhint-disable-next-line not-rely-on-time
                block.timestamp
            );

            // This step we destroy `DINERO` equivalent to all outstanding debt + protocol fee. This does not include the liquidator fee.
            // Liquidator keeps the rest as profit.
            // Liquidator recipient Dinero from the swap.
            DINERO.burn(recipient, liquidationInfo.allDebt + protocolFee);
        } else {
            // Liquidator will be paid in `COLLATERAL`

            // This step we destroy `DINERO` equivalent to all outstanding debt + protocol fee. This does not include the liquidator fee.
            // Liquidator keeps the rest as profit.
            // Liquidator has dinero in this scenario
            DINERO.burn(_msgSender(), liquidationInfo.allDebt + protocolFee);

            if (inUnderlying) {
                // Send collateral in Underlying to the `recipient` (includes liquidator fee + protocol fee)
                _sendBNB(payable(recipient), totalUnderlyingAmount);
            } else {
                // Send as a VToken
                IERC20Upgradeable(address(VTOKEN)).safeTransfer(
                    recipient,
                    liquidationInfo.allCollateral
                );
            }
        }
    }

    /*///////////////////////////////////////////////////////////////
                            PRIVATE FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    /**
     * @dev Helper function to check the balance of a `token` this contract has.
     *
     * @param token An ERC20 token.
     * @return uint256 The number of `token` in this contract.
     */
    function _contractBalanceOf(address token) private view returns (uint256) {
        // Find how many ERC20 tokens this contract has.
        return IERC20Upgradeable(token).balanceOf(address(this));
    }

    /**
     * @dev It is used to check if Compound style functions failed or suceeded by comparing `value` to 0.
     * If they fai, it reverts with `message`.
     *
     * @param value The number we wish to compare with {NO_ERROR}. Anything other than 0 indicates an error.
     * @param message The error message.
     */
    function _invariant(uint256 value, string memory message) private pure {
        // Revert for all values other than 0 with the `message`.
        if (value == NO_ERROR) return;
        revert(message);
    }

    /**
     * @dev Helper function to supply underlying to a `vToken` to mint vTokens and know how many vTokens we got.
     *
     * @param amount The amount of BNB tokens to be supplied.
     *
     * It supplies all underlying.
     */
    function _mintBNBVToken(uint256 amount)
        private
        returns (uint256 mintedAmount)
    {
        address vToken = address(VTOKEN);
        // Find how many VTokens we currently have.
        uint256 balanceBefore = _contractBalanceOf(vToken);

        // Supply ALL underlyings present in the contract even lost tokens to mint VTokens. It will revert if it fails.
        _invariant(
            IVBNB(vToken).mint{value: amount}(amount),
            "DM: failed to mint"
        );

        // Subtract the new balance from the previous one, to find out how many VTokens we minted.
        mintedAmount = _contractBalanceOf(vToken) - balanceBefore;
    }

    /**
     * @dev It redeems BNB from vBNB market and returns the amount of BNB received.
     *
     * @param amount The amount of vBNB to redeem not BNB.
     */
    function _redeemBNBVToken(uint256 amount)
        private
        returns (uint256 mintedAmount)
    {
        // Find how many VTokens we currently have.
        uint256 balanceBefore = address(this).balance;

        // Supply ALL underlyings present in the contract even lost tokens to mint VTokens. It will revert if it fails.
        _invariant(VTOKEN.redeem(amount), "DM: failed to redeem");

        // Subtract the new balance from the previous one, to find out how many VTokens we minted.
        mintedAmount = address(this).balance - balanceBefore;
    }

    /**
     * @dev A helper function to send BNB to an address.
     *
     * @param to The account that will receive BNB.
     * @param amount How much BNB to send to the `to` address.
     */
    function _sendBNB(address payable to, uint256 amount) private {
        //solhint-disable-next-line avoid-low-level-calls
        (bool success, bytes memory returnData) = to.call{
            value: _calculateSafeBNBTransferAmount(amount)
        }("");
        require(
            success,
            returnData.length == 0
                ? "DM: unable to remove collateral"
                : string(returnData)
        );
    }

    /**
     * @dev Helper function to claim Venus from VToken and fairly calculate the rewards.
     */
    function _claimVenus() private {
        uint256 _totalCollateral = totalVCollateral;

        // If there is no collateral in this contract, there is no XVS to claim.
        if (_totalCollateral == 0) return;

        address[] memory vTokenArray = new address[](1);

        address vToken = address(VTOKEN);

        vTokenArray[0] = address(vToken);

        // Save balance of XVS before claiming.
        uint256 xvsBalanceBefore = _contractBalanceOf(address(XVS));

        // Claim XVS in the `vToken`.
        VENUS_CONTROLLER.claimVenus(address(this), vTokenArray);

        // Calculate how much XVS we claimed.
        uint256 claimedVToken = _contractBalanceOf(address(XVS)) -
            xvsBalanceBefore;

        // Update state
        totalRewardsPerVToken += claimedVToken.mulDiv(
            10**address(vToken).safeDecimals(),
            _totalCollateral
        );
    }

    /**
     * @dev A helper function to only send XVS if there are rewards.
     *
     * @param to The address that will receive XVS
     * @param amount The number of XVS to send
     */
    function _transferXVS(address to, uint256 amount) private {
        if (amount == 0) return;

        IERC20Upgradeable xvs = XVS;

        //solhint-disable-next-line var-name-mixedcase
        uint256 XVSBalance = _contractBalanceOf(address(xvs));

        // In this contract our math should never cause a deviation bigger than this one.
        assert(XVSBalance + 0.001 ether >= amount);

        // Send the rewards
        xvs.safeTransfer(to, amount > XVSBalance ? XVSBalance : amount);
    }

    /**
     * dev A helper function to not send more BNB than the current balance.
     *
     * @param amount The desired amount of BNB to send.
     * @return uint256 The safe amount of BNB to send
     */
    function _calculateSafeBNBTransferAmount(uint256 amount)
        private
        view
        returns (uint256)
    {
        uint256 maximum = address(this).balance;

        // In this contract our math should never cause a deviation bigger than this one.
        assert(maximum + 0.001 ether >= amount);

        return amount > maximum ? maximum : amount;
    }
}
