/*


██╗███╗░░██╗████████╗███████╗██████╗░███████╗░██████╗████████╗
██║████╗░██║╚══██╔══╝██╔════╝██╔══██╗██╔════╝██╔════╝╚══██╔══╝
██║██╔██╗██║░░░██║░░░█████╗░░██████╔╝█████╗░░╚█████╗░░░░██║░░░
██║██║╚████║░░░██║░░░██╔══╝░░██╔══██╗██╔══╝░░░╚═══██╗░░░██║░░░
██║██║░╚███║░░░██║░░░███████╗██║░░██║███████╗██████╔╝░░░██║░░░
╚═╝╚═╝░░╚══╝░░░╚═╝░░░╚══════╝╚═╝░░╚═╝╚══════╝╚═════╝░░░░╚═╝░░░

░██████╗░░█████╗░██╗░░░██╗███████╗██████╗░███╗░░██╗░█████╗░██████╗░
██╔════╝░██╔══██╗██║░░░██║██╔════╝██╔══██╗████╗░██║██╔══██╗██╔══██╗
██║░░██╗░██║░░██║╚██╗░██╔╝█████╗░░██████╔╝██╔██╗██║██║░░██║██████╔╝
██║░░╚██╗██║░░██║░╚████╔╝░██╔══╝░░██╔══██╗██║╚████║██║░░██║██╔══██╗
╚██████╔╝╚█████╔╝░░╚██╔╝░░███████╗██║░░██║██║░╚███║╚█████╔╝██║░░██║
░╚═════╝░░╚════╝░░░░╚═╝░░░╚══════╝╚═╝░░╚═╝╚═╝░░╚══╝░╚════╝░╚═╝░░╚═╝


Copyright (c) 2021 Jose Cerqueira - All rights reserved

*/

//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.10;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";

import "./tokens/Dinero.sol";

import "./InterestMarketV1.sol";

/**
 * @dev The governor will manage the contracts by being able to grant and revoke the {MINTER_ROLE}.
 * It also allows new markets to be created by the {owner} via cloning to save gas.
 *
 * @notice The governor contracts apart from deployer will have the Dinero {DEFAULT_ADMIN_ROLE} to grant the correct roles to the markets.
 * @notice It uses the minimal clone proxy pattern.
 * @notice It needs to receive the {DEFAULT_ADMIN_ROLE} from the Dinero deployer.
 * @notice It controls the address that all markets fees will be sent to. The {owner} can upgrade it.
 */
contract InterestGovernorV1 is Ownable {
    /*///////////////////////////////////////////////////////////////
                                EVENTS
    //////////////////////////////////////////////////////////////*/

    event DineroMarketCreated(
        address indexed collateralToken,
        address indexed market,
        uint256 id
    );

    event DineroMarketAdded(address indexed market, uint256 id);

    event StakerUpdated(address indexed market, address indexed staker);

    event FeeToUpdated(address indexed feeTo);

    event CloseMarket(address indexed market);

    event OpenMarket(address indexed market);

    /*///////////////////////////////////////////////////////////////
                                STATE
    //////////////////////////////////////////////////////////////*/

    // solhint-disable-next-line var-name-mixedcase
    Dinero public immutable DINERO; // Stable coin of the Interest Protocol ecosystem.

    /**
     * @notice The address that will get all fees accrued by the market contracts.
     */
    address public feeTo;

    /**
     *  @notice stores all dinero markets.
     */
    address[] public allDineroMarkets;

    /**
     * @notice Quick way to verify if a market is Dinero roles.
     */
    mapping(address => bool) public isDineroMarket;

    /*///////////////////////////////////////////////////////////////
                            CONSTRUCTOR
    //////////////////////////////////////////////////////////////*/

    /**
     * @param dinero The address of the Dinero stable coin.
     */
    constructor(Dinero dinero) {
        DINERO = dinero;
    }

    /*///////////////////////////////////////////////////////////////
                            VIEW FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    /**
     * @return The number of all dinero markets.
     */
    function getAllDineroMarketsLength() external view returns (uint256) {
        return allDineroMarkets.length;
    }

    /**
     * @dev This allows you to know the address of a clone before/after deployment for offchain purposes.
     *
     * @param masterMarketContract The address of the implementation contract.
     * @param salt The keccak256 hash of the data to be passed to the initialize function.
     * @return the address of the clone
     */
    function predictMarketAddress(address masterMarketContract, bytes32 salt)
        external
        view
        returns (address)
    {
        return Clones.predictDeterministicAddress(masterMarketContract, salt);
    }

    /*///////////////////////////////////////////////////////////////
                            PRIVATE FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    /**
     * @dev A helper function to add {DINERO} roles to a market.
     *
     * @param market The address of the market that will get the roles.
     */
    function _grantDineroRoles(address market) private {
        DINERO.grantRole(DINERO.MINTER_ROLE(), market);
        DINERO.grantRole(DINERO.BURNER_ROLE(), market);
        isDineroMarket[market] = true;
        allDineroMarkets.push(market);
    }

    /*///////////////////////////////////////////////////////////////
                            ONLY OWNER FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    /**
     * @dev It assigns a new address to receive the accrued fees from  all the markets.
     *
     * @param _feeTo The new address that will receive the fees.
     *
     * Requirements:
     *
     * - It is guarded by the modifier {onlyOwner} to make sure funds are not mishandled.
     *
     */
    function setFeeTo(address _feeTo) external onlyOwner {
        require(_feeTo != address(0), "IFV1: not zero address");
        feeTo = _feeTo;
        emit FeeToUpdated(_feeTo);
    }

    /**
     * @dev This function allows for the creation of new markets via cloning using a master contract for gas optimization.
     *
     * @notice It gives minting and burning power to the clones.
     *
     * @param masterMarketContract The master implementation of a market contract.
     * @param collateralToken The {ERC20} that this market will support.
     * @param data The data required to initialize the clone contract.
     * @return market The address of the new market
     *
     * Requirements:
     * - It is guarded by the modifier {onlyOwner} to make sure that only secure markets have power to mint and burn Dinero.
     *
     */
    function createDineroMarket(
        address masterMarketContract,
        address collateralToken,
        bytes calldata data
    ) external onlyOwner returns (address market) {
        require(masterMarketContract != address(0), "IFV1: not zero address");
        require(collateralToken != address(0), "IFV1: not zero address");

        bytes32 salt = keccak256(data);

        market = Clones.cloneDeterministic(masterMarketContract, salt);

        InterestMarketV1(market).initialize(data);

        _grantDineroRoles(market);

        emit DineroMarketCreated(
            collateralToken,
            market,
            allDineroMarkets.length - 1
        );
    }

    /**
     * @dev It grants the {DINERO} roles to an already deployed market.
     *
     * @param market Address that will be granted both {DINERO} roles.
     *
     * Requirements:
     *
     * - caller must be the {owner} due to the immense power the roles have over the protocol.
     */
    function addDineroMarket(address market) external onlyOwner {
        require(market != address(0), "IFV1: not zero address");

        _grantDineroRoles(market);

        emit DineroMarketAdded(market, allDineroMarkets.length - 1);
    }

    /**
     * @dev This function will prevent markets to lend funds until they re-open. This is an emergency measure in case of exploits.
     *
     * @notice That markets still have the burn role. So loans can be closed and collaterals recovered by the user.
     *
     * @param market The account that will have it's minter role removed. It will not be able to create more Dinero.
     *
     * Important to note that the markets will still be able to burn funds so users can close their positions and get back their collateral.
     *
     * Requirements:
     *
     * - It is guarded by the modifier {onlyOwner} to prevent griefing.
     *
     */
    function closeMarket(address market) external onlyOwner {
        DINERO.revokeRole(DINERO.MINTER_ROLE(), market);
        emit CloseMarket(market);
    }

    /**
     * @dev This function will re-open markets after being closed. Markets will be able to issue Dinero once again.
     *
     * @param market The account that will be granted the minter role again to minting Dinero.
     *
     * Requirements:
     *
     * - It is guarded by the modifier {onlyOwner} to prevent losses of funds.
     * - `market` has to be registered to prevent unathorized accounts from minting Dinero.
     *
     */
    function openMarket(address market) external onlyOwner {
        require(isDineroMarket[market], "IFV1: not a dinero market");
        DINERO.grantRole(DINERO.MINTER_ROLE(), market);
        emit OpenMarket(market);
    }
}
