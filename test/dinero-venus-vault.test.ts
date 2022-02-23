import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { ethers } from 'hardhat';

import {
  Dinero,
  LiquidityRouter,
  MockERC20,
  MockNoInfiniteAllowanceERC20,
  MockSafeVenus,
  MockVenusToken,
  MockVenusTroller,
  PancakeFactory,
  PancakeRouter,
  TestDineroVenusVault,
  WETH9,
} from '../typechain';
import { deploy, multiDeploy } from './lib/test-utils';

const { parseEther } = ethers.utils;

const INITIAL_SUPPLY = parseEther('10000');

describe('DineroVenusVault', () => {
  let dineroVenusVault: TestDineroVenusVault;
  let dinero: Dinero;
  let XVS: MockNoInfiniteAllowanceERC20;
  let WBNB: MockERC20;
  let USDC: MockERC20;
  let DAI: MockERC20;
  let vUSDC: MockVenusToken;
  let vDAI: MockVenusToken;
  let liquidityRouter: LiquidityRouter;
  let router: PancakeRouter;
  let WETH: WETH9;
  let factory: PancakeFactory;
  let venusController: MockVenusTroller;
  let safeVenus: MockSafeVenus;

  let owner: SignerWithAddress;
  let alice: SignerWithAddress;
  let bob: SignerWithAddress;
  let feeTo: SignerWithAddress;

  beforeEach(async () => {
    [
      [owner, alice, bob, feeTo],
      [XVS, WBNB, USDC, DAI, vUSDC, vDAI, WETH, dinero, safeVenus],
    ] = await Promise.all([
      ethers.getSigners(),
      multiDeploy(
        [
          'MockNoInfiniteAllowanceERC20',
          'MockERC20',
          'MockERC20',
          'MockERC20',
          'MockVenusToken',
          'MockVenusToken',
          'WETH9',
          'Dinero',
          'MockSafeVenus',
        ],
        [
          ['Venus Token', 'XVS', INITIAL_SUPPLY],
          ['Wrapped BNB', 'WBNB', INITIAL_SUPPLY],
          ['USDC', 'USDC', INITIAL_SUPPLY],
          ['DAI', 'DAI', INITIAL_SUPPLY],
          ['Venus USDC', 'vUSDC', 0],
          ['Venus DAI', 'vDAI', 0],
          [],
          [],
          [],
          [],
        ]
      ),
    ]);

    [factory, venusController] = await multiDeploy(
      ['PancakeFactory', 'MockVenusTroller'],
      [[feeTo.address], [XVS.address]]
    );

    [liquidityRouter, router] = await multiDeploy(
      ['LiquidityRouter', 'PancakeRouter'],
      [
        [factory.address, WETH.address],
        [factory.address, WETH.address],
      ]
    );

    dineroVenusVault = await deploy('TestDineroVenusVault', [
      XVS.address,
      WBNB.address,
      router.address,
      venusController.address,
      dinero.address,
      safeVenus.address,
      feeTo.address,
    ]);

    await Promise.all([
      dinero
        .connect(owner)
        .grantRole(await dinero.MINTER_ROLE(), dineroVenusVault.address),
      XVS.mint(owner.address, parseEther('500000')),
      DAI.mint(owner.address, parseEther('1000000')),
      WBNB.mint(owner.address, parseEther('20000')),
      USDC.mint(owner.address, parseEther('1000000')),
      DAI.mint(alice.address, parseEther('1000000')),
      USDC.mint(alice.address, parseEther('1000000')),
      DAI.mint(bob.address, parseEther('1000000')),
      USDC.mint(bob.address, parseEther('1000000')),
      WBNB.connect(owner).approve(
        liquidityRouter.address,
        ethers.constants.MaxUint256
      ),
      XVS.connect(owner).approve(
        liquidityRouter.address,
        ethers.constants.MaxUint256
      ),
      DAI.connect(owner).approve(
        liquidityRouter.address,
        ethers.constants.MaxUint256
      ),
      USDC.connect(owner).approve(
        liquidityRouter.address,
        ethers.constants.MaxUint256
      ),
      USDC.connect(owner).approve(
        dineroVenusVault.address,
        ethers.constants.MaxUint256
      ),
      DAI.connect(alice).approve(
        dineroVenusVault.address,
        ethers.constants.MaxUint256
      ),
      USDC.connect(alice).approve(
        dineroVenusVault.address,
        ethers.constants.MaxUint256
      ),
      DAI.connect(bob).approve(
        dineroVenusVault.address,
        ethers.constants.MaxUint256
      ),
      USDC.connect(bob).approve(
        dineroVenusVault.address,
        ethers.constants.MaxUint256
      ),
      dineroVenusVault.connect(owner).setCollateralLimit(parseEther('0.5')),
      vDAI.__setUnderlying(DAI.address),
      vUSDC.__setUnderlying(USDC.address),
      vDAI.__setCollateralFactor(parseEther('0.8')),
      vUSDC.__setCollateralFactor(parseEther('0.9')),
      dineroVenusVault.connect(owner).setCompoundDepth(3),
    ]);

    await Promise.all([
      liquidityRouter.addLiquidity(
        XVS.address,
        WBNB.address,
        parseEther('200000'), // 1 XVS = 10 USD => 200_000 XVS is 1M usd
        parseEther('4000'), // 1 BNB = 500 USD => 4_000 BNB is 1M usd
        0,
        0,
        owner.address,
        0
      ),
      liquidityRouter.addLiquidity(
        WBNB.address,
        DAI.address,
        parseEther('4000'), // 1 BNB = 500 USD => 4_000 BNB is 1M usd
        parseEther('1000000'), // stable coin
        0,
        0,
        owner.address,
        0
      ),
      liquidityRouter.addLiquidity(
        WBNB.address,
        USDC.address,
        parseEther('4000'), // 1 BNB = 500 USD => 4_000 BNB is 1M usd
        parseEther('1000000'), // stable coin
        0,
        0,
        owner.address,
        0
      ),
      dineroVenusVault.connect(owner).addVToken(vUSDC.address),
      dineroVenusVault.connect(owner).addVToken(vDAI.address),
      // Taken from Venus https://bscscan.com/token/0xeca88125a5adbe82614ffc12d0db554e2e2867c8?a=0xea6f7275f790dd22efc363873ca9b35d3c196509#readProxyContract
      vUSDC.__setExchangeRateCurrent(
        ethers.BigNumber.from('213429808155036526652502393')
      ),
      vDAI.__setExchangeRateCurrent(
        ethers.BigNumber.from('210574688941918400320722412')
      ),
      safeVenus.__setVTokenCollateralFactor(vUSDC.address, parseEther('0.9')),
      safeVenus.__setVTokenCollateralFactor(vDAI.address, parseEther('0.8')),
    ]);
  });

  describe('Simple Owner functions', () => {
    it('updates the compoundDepth', async () => {
      await expect(
        dineroVenusVault.connect(alice).setCompoundDepth(0)
      ).to.revertedWith('Ownable: caller is not the owner');

      expect(await dineroVenusVault.compoundDepth()).to.be.equal(3);

      await expect(dineroVenusVault.connect(owner).setCompoundDepth(5))
        .to.emit(dineroVenusVault, 'CompoundDepth')
        .withArgs(3, 5);

      expect(await dineroVenusVault.compoundDepth()).to.be.equal(5);

      await expect(
        dineroVenusVault.connect(owner).setCompoundDepth(20)
      ).to.revertedWith('DV: must be lower than 20');

      await expect(
        dineroVenusVault.connect(owner).setCompoundDepth(21)
      ).to.revertedWith('DV: must be lower than 20');
    });
    it('updates the collateral limit', async () => {
      await expect(
        dineroVenusVault.connect(alice).setCollateralLimit(0)
      ).to.revertedWith('Ownable: caller is not the owner');

      expect(await dineroVenusVault.collateralLimit()).to.be.equal(
        parseEther('0.5')
      );

      await expect(
        dineroVenusVault.connect(owner).setCollateralLimit(parseEther('0.8'))
      )
        .to.emit(dineroVenusVault, 'CollateralLimit')
        .withArgs(parseEther('0.5'), parseEther('0.8'));

      expect(await dineroVenusVault.collateralLimit()).to.be.equal(
        parseEther('0.8')
      );

      await expect(
        dineroVenusVault.setCollateralLimit(parseEther('0.91'))
      ).to.revertedWith('DV: must be lower than 90%');
    });
    it('can pause and unpause the contract', async () => {
      expect(await dineroVenusVault.paused()).to.be.equal(false);

      await expect(dineroVenusVault.connect(owner).pause())
        .to.emit(dineroVenusVault, 'Paused')
        .withArgs(owner.address);

      expect(await dineroVenusVault.paused()).to.be.equal(true);

      await expect(dineroVenusVault.connect(owner).unpause())
        .to.emit(dineroVenusVault, 'Unpaused')
        .withArgs(owner.address);

      await expect(dineroVenusVault.connect(alice).unpause()).to.revertedWith(
        'Ownable: caller is not the owner'
      );

      await expect(dineroVenusVault.connect(alice).pause()).to.revertedWith(
        'Ownable: caller is not the owner'
      );
    });
  });
  describe('function: removeVToken', () => {
    it('reverts if it not called by the owner', async () => {
      await expect(
        dineroVenusVault.connect(alice).removeVToken(vUSDC.address)
      ).to.revertedWith('Ownable: caller is not the owner');
    });
    it('reverts if the venus controllers fails to exit the market', async () => {
      await venusController.__setExitMarketReturn(1);
      const [isUSDCSupported, vTokenOfUSDC] = await Promise.all([
        dineroVenusVault.isUnderlyingSupported(USDC.address),
        dineroVenusVault.vTokenOf(USDC.address),
      ]);

      expect(isUSDCSupported).to.be.equal(true);

      expect(vTokenOfUSDC).to.be.equal(vUSDC.address);

      await expect(
        dineroVenusVault.removeVToken(vUSDC.address)
      ).to.revertedWith('DV: failed to exit market');

      const [isUSDCSupported2, vTokenOfUSDC2] = await Promise.all([
        dineroVenusVault.isUnderlyingSupported(USDC.address),
        dineroVenusVault.vTokenOf(USDC.address),
      ]);

      expect(isUSDCSupported2).to.be.equal(true);

      expect(vTokenOfUSDC2).to.be.equal(vUSDC.address);
    });
    it('removes a VToken', async () => {
      const [isUSDCSupported, vTokenOfUSDC] = await Promise.all([
        dineroVenusVault.isUnderlyingSupported(USDC.address),
        dineroVenusVault.vTokenOf(USDC.address),
      ]);

      expect(isUSDCSupported).to.be.equal(true);

      expect(vTokenOfUSDC).to.be.equal(vUSDC.address);

      await expect(dineroVenusVault.connect(owner).removeVToken(vUSDC.address))
        .to.emit(dineroVenusVault, 'RemoveVToken')
        .withArgs(vUSDC.address, USDC.address)
        .to.emit(USDC, 'Approval')
        .withArgs(dineroVenusVault.address, vUSDC.address, 0)
        .to.emit(venusController, 'ExitMarket')
        .withArgs(vUSDC.address);

      const [isUSDCSupported2, vTokenOfUSDC2] = await Promise.all([
        dineroVenusVault.isUnderlyingSupported(USDC.address),
        dineroVenusVault.vTokenOf(USDC.address),
      ]);

      expect(isUSDCSupported2).to.be.equal(false);

      expect(vTokenOfUSDC2).to.be.equal(ethers.constants.AddressZero);
    });
  });
  describe('function: addVToken', () => {
    it('reverts if it not called by the owner', async () => {
      await expect(
        dineroVenusVault.connect(alice).addVToken(vUSDC.address)
      ).to.revertedWith('Ownable: caller is not the owner');
    });
    it('reverts if the venus controller fails to enter the market', async () => {
      await Promise.all([
        venusController.__setEnterMarketReturn(1),
        dineroVenusVault.removeVToken(vUSDC.address),
      ]);

      const [isUSDCSupported, vTokenOfUSDC] = await Promise.all([
        dineroVenusVault.isUnderlyingSupported(USDC.address),
        dineroVenusVault.vTokenOf(USDC.address),
      ]);

      expect(isUSDCSupported).to.be.equal(false);

      expect(vTokenOfUSDC).to.be.equal(ethers.constants.AddressZero);

      await expect(dineroVenusVault.addVToken(vUSDC.address)).to.revertedWith(
        'DV: failed to enter market'
      );

      const [isUSDCSupported2, vTokenOfUSDC2] = await Promise.all([
        dineroVenusVault.isUnderlyingSupported(USDC.address),
        dineroVenusVault.vTokenOf(USDC.address),
      ]);

      expect(isUSDCSupported2).to.be.equal(false);

      expect(vTokenOfUSDC2).to.be.equal(ethers.constants.AddressZero);
    });
    it('adds a vToken', async () => {
      // We need to remove so we can test the {addVToken}
      await dineroVenusVault.removeVToken(vUSDC.address);

      const [isUSDCSupported, vTokenOfUSDC] = await Promise.all([
        dineroVenusVault.isUnderlyingSupported(USDC.address),
        dineroVenusVault.vTokenOf(USDC.address),
      ]);

      expect(isUSDCSupported).to.be.equal(false);

      expect(vTokenOfUSDC).to.be.equal(ethers.constants.AddressZero);

      await expect(dineroVenusVault.addVToken(vUSDC.address))
        .to.emit(dineroVenusVault, 'AddVToken')
        .withArgs(vUSDC.address, USDC.address)
        .to.emit(venusController, 'EnterMarket')
        .withArgs(vUSDC.address)
        .to.emit(USDC, 'Approval')
        .withArgs(
          dineroVenusVault.address,
          vUSDC.address,
          ethers.constants.MaxUint256
        );

      const [isUSDCSupported2, vTokenOfUSDC2] = await Promise.all([
        dineroVenusVault.isUnderlyingSupported(USDC.address),
        dineroVenusVault.vTokenOf(USDC.address),
      ]);

      expect(isUSDCSupported2).to.be.equal(true);

      expect(vTokenOfUSDC2).to.be.equal(vUSDC.address);
    });
  });
  describe('function: emergencyRecovery', async () => {
    it('allows only the owner to call when it is paused', async () => {
      await expect(
        dineroVenusVault.connect(alice).emergencyRecovery()
      ).to.revertedWith('Ownable: caller is not the owner');

      await expect(
        dineroVenusVault.connect(owner).emergencyRecovery()
      ).to.revertedWith('Pausable: not paused');
    });
    it('reverts if it fails to redeem or repay', async () => {
      // vToken redeemUnderlying function will throw like Compound.
      await Promise.all([
        vUSDC.__setRedeemUnderlyingReturn(1),
        dineroVenusVault
          .connect(alice)
          .deposit(USDC.address, parseEther('100000')),
      ]);

      await dineroVenusVault.leverage(vUSDC.address);
      await dineroVenusVault.connect(owner).pause();

      await expect(
        dineroVenusVault.connect(owner).emergencyRecovery()
      ).to.revertedWith('DV: failed to redeem');

      // vToken redeemUnderlying function will throw like Compound.
      await Promise.all([
        vUSDC.__setRedeemUnderlyingReturn(0),
        vUSDC.__setRepayReturnValue(1),
      ]);
      await expect(
        dineroVenusVault.connect(owner).emergencyRecovery()
      ).to.revertedWith('DV: failed to repay');

      await Promise.all([
        vUSDC.__setRedeemReturn(1),
        vUSDC.__setRepayReturnValue(0),
      ]);

      await expect(
        dineroVenusVault.connect(owner).emergencyRecovery()
      ).to.revertedWith('DV: failed to redeem vtokens');
    });
    it('repays all USDC and DAI', async () => {
      // vToken redeemUnderlying function will throw like Compound.
      await Promise.all([
        dineroVenusVault
          .connect(alice)
          .deposit(USDC.address, parseEther('100000')),
        dineroVenusVault.connect(bob).deposit(DAI.address, parseEther('1000')),
      ]);

      const [vUSDCBalance, vDAIBalance] = await Promise.all([
        vUSDC.balanceOf(dineroVenusVault.address),
        vDAI.balanceOf(dineroVenusVault.address),
      ]);

      await dineroVenusVault.leverage(vUSDC.address);
      await dineroVenusVault.connect(owner).pause();

      await expect(dineroVenusVault.connect(owner).emergencyRecovery())
        .to.emit(dineroVenusVault, 'EmergencyRecovery')
        .withArgs(vUSDCBalance)
        .to.emit(dineroVenusVault, 'EmergencyRecovery')
        .withArgs(vDAIBalance);

      const [vUSDCBalance2, vDAIBalance2] = await Promise.all([
        vUSDC.balanceOf(dineroVenusVault.address),
        vDAI.balanceOf(dineroVenusVault.address),
      ]);

      expect(vUSDCBalance2).to.be.equal(0);
      expect(vDAIBalance2).to.be.equal(0);
    });
    it('repays all USDC and not DAI', async () => {
      // vToken redeemUnderlying function will throw like Compound.
      await dineroVenusVault
        .connect(alice)
        .deposit(USDC.address, parseEther('100000'));

      await dineroVenusVault.leverage(vUSDC.address);
      await dineroVenusVault.connect(owner).pause();

      const receipt = await dineroVenusVault.connect(owner).emergencyRecovery();

      const awaitedReceipt = await receipt.wait();

      expect(
        awaitedReceipt.events?.filter((x) => x.event === 'EmergencyRecovery')
          .length
      ).to.be.equal(1);

      expect(await vUSDC.balanceOf(dineroVenusVault.address)).to.be.equal(0);
    });
  });
  describe('function: repayAll', async () => {
    it('reverts if the caller is not the owner', async () => {
      await expect(
        dineroVenusVault.connect(alice).repayAll(vUSDC.address)
      ).to.revertedWith('Ownable: caller is not the owner');
    });
    it('does not repay if there if the vault did not borrow', async () => {
      await dineroVenusVault
        .connect(alice)
        .deposit(USDC.address, parseEther('100000'));

      const vUSDCBalance = await vUSDC.balanceOf(dineroVenusVault.address);

      await expect(
        dineroVenusVault.connect(owner).repayAll(vUSDC.address)
      ).to.not.emit(dineroVenusVault, 'RepayAndRedeem');

      expect(await vUSDC.balanceOf(dineroVenusVault.address)).to.be.equal(
        vUSDCBalance
      );
    });
    it('does not repay if there if the vault borrowed but safe redeem is 0', async () => {
      await dineroVenusVault
        .connect(alice)
        .deposit(USDC.address, parseEther('100000'));

      await Promise.all([
        dineroVenusVault.leverage(vUSDC.address),
        safeVenus.__setSafeRedeem(0),
      ]);

      const vUSDCBalance = await vUSDC.balanceOf(dineroVenusVault.address);

      await expect(
        dineroVenusVault.connect(owner).repayAll(vUSDC.address)
      ).to.not.emit(dineroVenusVault, 'RepayAndRedeem');

      expect(await vUSDC.balanceOf(dineroVenusVault.address)).to.be.equal(
        vUSDCBalance
      );
    });
    it('repays all debt', async () => {
      await dineroVenusVault
        .connect(alice)
        .deposit(USDC.address, parseEther('100000'));

      await dineroVenusVault.leverage(vUSDC.address);

      await safeVenus.safeRedeem(dineroVenusVault.address, vUSDC.address);

      const redeemAmount = await safeVenus.safeRedeemReturn();

      await expect(dineroVenusVault.connect(owner).repayAll(vUSDC.address))
        .to.emit(dineroVenusVault, 'RepayAndRedeem')
        .withArgs(vUSDC.address, redeemAmount);

      await safeVenus.borrowAndSupply(dineroVenusVault.address, vUSDC.address);

      const [borrowBalance, supplyBalance] = await Promise.all([
        safeVenus.borrowBalance(),
        safeVenus.supplyBalance(),
      ]);

      expect(borrowBalance).to.be.equal(0);
      expect(supplyBalance).to.be.equal(parseEther('100000'));
    });
    it('calls repay and redeem multiple times', async () => {
      await dineroVenusVault
        .connect(alice)
        .deposit(USDC.address, parseEther('100000'));

      await dineroVenusVault.leverage(vUSDC.address);

      const receipt = await dineroVenusVault
        .connect(owner)
        .repayAll(vUSDC.address);

      const awaitedReceipt = await receipt.wait();

      const array =
        awaitedReceipt.events?.filter((x) => x.event === 'RepayAndRedeem') ||
        [];

      expect(array.length > 1).to.be.equal(true);
    });
  });
  it('maximizes the allowance for PCS router for XVS', async () => {
    const [allowance] = await Promise.all([
      XVS.allowance(dineroVenusVault.address, router.address),
      venusController.__setClaimVenusValue(parseEther('10000')),
    ]);

    // dineroVenusVault sold XVS on PCS - decreasing its allowance
    await dineroVenusVault
      .connect(alice)
      .deposit(USDC.address, parseEther('10000'));

    expect(allowance).to.be.equal(ethers.constants.MaxUint256);
    // first deposit, the contract does not call {_investXVS}
    expect(
      await XVS.allowance(dineroVenusVault.address, router.address)
    ).to.be.equal(ethers.constants.MaxUint256);

    await dineroVenusVault
      .connect(alice)
      .deposit(USDC.address, parseEther('10000'));

    expect(
      await XVS.allowance(dineroVenusVault.address, router.address)
    ).to.be.equal(ethers.constants.MaxUint256.sub(parseEther('10000')));

    await expect(dineroVenusVault.connect(bob).approveXVS())
      .to.emit(XVS, 'Approval')
      .withArgs(
        dineroVenusVault.address,
        router.address,
        ethers.constants.MaxUint256
      );

    expect(
      await XVS.allowance(dineroVenusVault.address, router.address)
    ).to.be.equal(ethers.constants.MaxUint256);
  });
  describe('function: leverage', () => {
    it('does not borrow if the safe borrow amount is 500 USD or less', async () => {
      await dineroVenusVault
        .connect(alice)
        .deposit(USDC.address, parseEther('1000'));

      await expect(dineroVenusVault.connect(bob).leverage(vUSDC.address))
        .to.not.emit(vUSDC, 'Borrow')
        // Transfer is emitted when supplying an asset because it mints {vUSDC}.
        .to.not.emit(vUSDC, 'Transfer');
    });
    it('does not borrow if compoundDepth is 0', async () => {
      await Promise.all([
        dineroVenusVault.connect(owner).setCompoundDepth(0),
        dineroVenusVault
          .connect(alice)
          // 2000 USD deposit amount gives enough room to leverage
          .deposit(USDC.address, parseEther('2000')),
      ]);

      await expect(dineroVenusVault.connect(bob).leverage(vUSDC.address))
        .to.not.emit(vUSDC, 'Borrow')
        // Transfer is emitted when supplying an asset because it mints {vUSDC}.
        .to.not.emit(vUSDC, 'Transfer');
    });
    it('reverts if the vToken fails to borrow or supply', async () => {
      await Promise.all([
        vUSDC.__setBorrowReturn(2),
        dineroVenusVault
          .connect(alice)
          // 2000 USD deposit amount gives enough room to leverage
          .deposit(USDC.address, parseEther('2000')),
      ]);

      await expect(
        dineroVenusVault.connect(bob).leverage(vUSDC.address)
      ).to.revertedWith('DV: failed to borrow');

      await Promise.all([vUSDC.__setBorrowReturn(0), vUSDC.__setMintReturn(1)]);

      await expect(
        dineroVenusVault.connect(bob).leverage(vUSDC.address)
      ).to.revertedWith('DV: failed to mint');
    });
    it('borrows and supplies a maximum of compoundDepth times', async () => {
      const [compoundDepth] = await Promise.all([
        dineroVenusVault.compoundDepth(),
        dineroVenusVault
          .connect(alice)
          .deposit(USDC.address, parseEther('1000000')),
        dineroVenusVault
          .connect(bob)
          .deposit(USDC.address, parseEther('1000000')),
      ]);

      const [supply, borrow] = await Promise.all([
        vUSDC.balanceOfUnderlying(dineroVenusVault.address),
        vUSDC.borrowBalanceCurrent(dineroVenusVault.address),
      ]);

      // 2_000_000 USD should allow the vault to leverage more than 3x if it was not limited by the {compoundDepth}
      const receipt = await (
        await dineroVenusVault.connect(bob).leverage(vUSDC.address)
      ).wait();

      const [supply2, borrow2] = await Promise.all([
        vUSDC.balanceOfUnderlying(dineroVenusVault.address),
        vUSDC.borrowBalanceCurrent(dineroVenusVault.address),
      ]);

      expect(supply).to.be.equal(parseEther('2000000'));
      expect(borrow).to.be.equal(0);
      // START: 2_000_000
      // FIRST CYCLE: SUPPLY => 2_900_000 | BORROW => 900_000 | 2_000_000 * 0.45
      // SECOND CYCLE: SUPPLY => 3_305_00 | BORROW => 405_000 | 2_900_000 * 0.45 - 900_000
      // THIRD CYCLE: SUPPLY => 3_487_250 | BORROW => 182_250 | 3305000 * 0.45 - 900000 - 405000
      expect(borrow2).to.be.equal(parseEther('1487250')); // 900_000 + 405_000 + 182_250
      expect(supply2).to.be.equal(parseEther('3487250'));

      const borrowTopic = vUSDC.interface.getEventTopic(
        vUSDC.interface.getEvent('Borrow')
      );
      const supplyTopic = vUSDC.interface.getEventTopic(
        vUSDC.interface.getEvent('Transfer')
      );

      expect(
        receipt.events
          ?.filter((x) => x.topics.includes(borrowTopic))
          .filter(
            (x) =>
              x.address.toLocaleLowerCase() ===
              vUSDC.address.toLocaleLowerCase()
          ).length
      ).to.be.equal(compoundDepth);
      expect(
        receipt.events
          ?.filter((x) => x.topics.includes(supplyTopic))
          .filter(
            (x) =>
              x.address.toLocaleLowerCase() ===
              vUSDC.address.toLocaleLowerCase()
          ).length
      ).to.be.equal(compoundDepth);
    });
  });
  it('calls leverage in all listed assets', async () => {
    const [compoundDepth] = await Promise.all([
      dineroVenusVault.compoundDepth(),
      dineroVenusVault
        .connect(alice)
        .deposit(USDC.address, parseEther('1000000')),
      dineroVenusVault
        .connect(bob)
        .deposit(USDC.address, parseEther('1000000')),
      dineroVenusVault
        .connect(alice)
        .deposit(DAI.address, parseEther('1000000')),
      dineroVenusVault.connect(bob).deposit(DAI.address, parseEther('1000000')),
    ]);

    const receipt = await (
      await dineroVenusVault.connect(bob).leverageAll()
    ).wait();

    const USDCborrowTopic = vUSDC.interface.getEventTopic(
      vUSDC.interface.getEvent('Borrow')
    );
    const USDCsupplyTopic = vUSDC.interface.getEventTopic(
      vUSDC.interface.getEvent('Transfer')
    );

    const DAIborrowTopic = vDAI.interface.getEventTopic(
      vDAI.interface.getEvent('Borrow')
    );
    const DAIsupplyTopic = vDAI.interface.getEventTopic(
      vDAI.interface.getEvent('Transfer')
    );

    expect(
      receipt.events
        ?.filter((x) => x.topics.includes(USDCborrowTopic))
        .filter(
          (x) =>
            x.address.toLocaleLowerCase() === vUSDC.address.toLocaleLowerCase()
        ).length
    ).to.be.equal(compoundDepth);
    expect(
      receipt.events
        ?.filter((x) => x.topics.includes(USDCsupplyTopic))
        .filter(
          (x) =>
            x.address.toLocaleLowerCase() === vUSDC.address.toLocaleLowerCase()
        ).length
    ).to.be.equal(compoundDepth);

    expect(
      receipt.events
        ?.filter((x) => x.topics.includes(DAIborrowTopic))
        .filter(
          (x) =>
            x.address.toLocaleLowerCase() === vDAI.address.toLocaleLowerCase()
        ).length
    ).to.be.equal(compoundDepth);
    expect(
      receipt.events
        ?.filter((x) => x.topics.includes(DAIsupplyTopic))
        .filter(
          (x) =>
            x.address.toLocaleLowerCase() === vDAI.address.toLocaleLowerCase()
        ).length
    ).to.be.equal(compoundDepth);
  });
  describe('function: deleverage', () => {
    it('does nothing if the deleverage amount is 0', async () => {
      await expect(
        dineroVenusVault.connect(bob).deleverage(vUSDC.address)
      ).to.not.emit(vUSDC, 'Redeem');

      // Should not trigger a deleverage as it stays within the parameters
      // Deleveraged is triggered if parameters change or USDC price of underlying
      await dineroVenusVault.connect(bob).leverage(vUSDC.address);

      await expect(
        dineroVenusVault.connect(bob).deleverage(vUSDC.address)
      ).to.not.emit(vUSDC, 'Redeem');
    });
    it('reverts if redeemUnderlying or repayBorrow from vToken revert', async () => {
      // Set collateral ratio at 80% which will trigger a deleverage since our safe collateral ratio is at 45%
      await Promise.all([
        vUSDC.__setBalanceOfUnderlying(
          dineroVenusVault.address,
          parseEther('100000')
        ),
        vUSDC.__setBorrowBalanceCurrent(
          dineroVenusVault.address,
          parseEther('80000')
        ),
        // will trigger the error
        vUSDC.__setRedeemUnderlyingReturn(1),
        safeVenus.__setVTokenCollateralFactor(vUSDC.address, parseEther('0.9')),
      ]);

      await expect(
        dineroVenusVault.connect(bob).deleverage(vUSDC.address)
      ).to.revertedWith('DV: failed to redeem');

      await Promise.all([
        vUSDC.__setBalanceOfUnderlying(dineroVenusVault.address, 0),
        vUSDC.__setBorrowBalanceCurrent(dineroVenusVault.address, 0),
        vUSDC.__setRedeemUnderlyingReturn(0),
        vUSDC.__setRepayReturnValue(1),
      ]);

      await Promise.all([
        dineroVenusVault
          .connect(alice)
          .deposit(USDC.address, parseEther('1000000')),
        dineroVenusVault
          .connect(bob)
          .deposit(USDC.address, parseEther('1000000')),
      ]);

      // 0.9 (vToken collateral factor) * 0.9 => 0.81. So we borrow up to 0.8 => 2_000_000 * 0.8. Should trigger a deleverage
      await dineroVenusVault.borrow(vUSDC.address, parseEther('1600000'));

      await expect(
        dineroVenusVault.connect(bob).deleverage(vUSDC.address)
      ).to.revertedWith('DV: failed to repay');
    });
    it('deleverages the vault by redeeming and then repaying', async () => {
      await Promise.all([
        dineroVenusVault
          .connect(alice)
          .deposit(USDC.address, parseEther('1000000')),
        safeVenus.__setVTokenCollateralFactor(vUSDC.address, parseEther('0.9')),
      ]);

      // safe collateral ratio will be 0.9 * 0.5 = 0.45
      // Gonna leverage the vault to 0.7 collateral ratio which will trigger a deleverage
      // Safe Venus will start deleveraging current supply minus (borrow / 0.81). 0.9 * 0.9 = 0.81
      // We are supplying 1_000_000 and borrowing 800_000 => collateral ratio of 0.8 to trigger a deleverage
      await dineroVenusVault
        .connect(bob)
        .borrow(vUSDC.address, parseEther('700000'));

      await expect(dineroVenusVault.connect(bob).deleverage(vUSDC.address))
        // RATIO = 0.7 > 0.45
        // BORROW => 700_000
        // SAFE SUPPLY => ~864_197 (700_000 / 0.81)
        // CURRENT SUPPLY => 1_000_000
        // AMOUNT => ~135_802
        .to.emit(vUSDC, 'RedeemUnderlying')
        .withArgs(parseEther('135802.469135802469135803'))
        .to.emit(vUSDC, 'RepayBorrow')
        .withArgs(parseEther('135802.469135802469135803'))
        // RATIO = ~0.65 > 0.45
        // BORROW => ~ 564_200
        // SAFE SUPPLY => ~ 696_543 (564_200 / 0.81)
        // CURRENT SUPPLY => ~864_198
        // AMOUNT => ~ 167_655
        .to.emit(vUSDC, 'RedeemUnderlying')
        .withArgs(parseEther('167657.369303459838439263'))
        .to.emit(vUSDC, 'RepayBorrow')
        .withArgs(parseEther('167657.369303459838439263'))
        // RATIO = ~0.65 > 0.45
        // BORROW => ~ 396_545
        // SAFE SUPPLY => ~ 489_561 (396_545 / 0.81)
        // CURRENT SUPPLY => ~ 696_543
        // AMOUNT => ~ 206_982
        .to.emit(vUSDC, 'RedeemUnderlying')
        .withArgs(parseEther('206984.406547481282023781'))
        .to.emit(vUSDC, 'RepayBorrow')
        .withArgs(parseEther('206984.406547481282023781'));
      // RATIO = ~ 038 < 0.45. It will not deleverage anymore
      // BORROW => ~ 189_561
      // CURRENT SUPPLY => ~ 489_559
    });
    it('deleverages all listed assets', async () => {
      await Promise.all([
        dineroVenusVault
          .connect(bob)
          .deposit(USDC.address, parseEther('1000000')),
        dineroVenusVault
          .connect(alice)
          .deposit(DAI.address, parseEther('1000000')),
        // Need to adjust DAI collateral factor to behave like USDC
        safeVenus.__setVTokenCollateralFactor(vUSDC.address, parseEther('0.9')),
        safeVenus.__setVTokenCollateralFactor(vDAI.address, parseEther('0.9')),
        vDAI.__setCollateralFactor(parseEther('0.9')),
      ]);

      await Promise.all([
        dineroVenusVault
          .connect(bob)
          .borrow(vUSDC.address, parseEther('700000')),
        dineroVenusVault
          .connect(bob)
          .borrow(vDAI.address, parseEther('700000')),
      ]);

      const receipt = await (
        await dineroVenusVault.connect(bob).deleverageAll()
      ).wait();

      const USDCRedeemUnderlyingTopic = vUSDC.interface.getEventTopic(
        vUSDC.interface.getEvent('RedeemUnderlying')
      );
      const USDCRepayBorrowTopic = vUSDC.interface.getEventTopic(
        vUSDC.interface.getEvent('RepayBorrow')
      );

      const DAIRedeemUnderlyingTopic = vDAI.interface.getEventTopic(
        vDAI.interface.getEvent('RedeemUnderlying')
      );
      const DAIRepayBorrowTopic = vDAI.interface.getEventTopic(
        vDAI.interface.getEvent('RepayBorrow')
      );

      // Based on previous test calculations, it requires 3 loops of redeem and repay to deleverage a position with a  supply of 1m and 700k borrow.
      expect(
        receipt.events
          ?.filter((x) => x.topics.includes(USDCRedeemUnderlyingTopic))
          .filter(
            (x) =>
              x.address.toLocaleLowerCase() ===
              vUSDC.address.toLocaleLowerCase()
          ).length
      ).to.be.equal(3);
      expect(
        receipt.events
          ?.filter((x) => x.topics.includes(USDCRepayBorrowTopic))
          .filter(
            (x) =>
              x.address.toLocaleLowerCase() ===
              vUSDC.address.toLocaleLowerCase()
          ).length
      ).to.be.equal(3);

      expect(
        receipt.events
          ?.filter((x) => x.topics.includes(DAIRedeemUnderlyingTopic))
          .filter(
            (x) =>
              x.address.toLocaleLowerCase() === vDAI.address.toLocaleLowerCase()
          ).length
      ).to.be.equal(3);
      expect(
        receipt.events
          ?.filter((x) => x.topics.includes(DAIRepayBorrowTopic))
          .filter(
            (x) =>
              x.address.toLocaleLowerCase() === vDAI.address.toLocaleLowerCase()
          ).length
      ).to.be.equal(3);
    });
  });
  describe('function: deposit', () => {
    it('reverts if the underlying is not whitelisted', async () => {
      await expect(
        dineroVenusVault.connect(bob).deposit(alice.address, 0)
      ).to.revertedWith('DV: underlying not whitelisted');
    });
    it('reverts if the contract is paused', async () => {
      await dineroVenusVault.connect(owner).pause();
      await expect(
        dineroVenusVault.connect(bob).deposit(USDC.address, parseEther('1000'))
      ).to.revertedWith('Pausable: paused');
    });
    it('reverts if the user tries to deposit 0 tokens', async () => {
      await expect(
        dineroVenusVault.connect(alice).deposit(USDC.address, 0)
      ).to.revertedWith('DV: no zero amount');
    });
    it('does not claim XVS not checks for rewards or losses on first deposit', async () => {
      const [
        aliceUSDCBalance,
        vUSDCUSDBalance,
        vaultVUSDCBalance,
        exchangeRate,
        totalFreeVTokens,
        aliceAccount,
        rewards,
        totalFreeUnderlying,
        aliceDineroBalance,
      ] = await Promise.all([
        USDC.balanceOf(alice.address),
        USDC.balanceOf(vUSDC.address),
        vUSDC.balanceOf(dineroVenusVault.address),
        vUSDC.exchangeRateCurrent(),
        dineroVenusVault.totalFreeVTokenOf(vUSDC.address),
        dineroVenusVault.accountOf(USDC.address, alice.address),
        dineroVenusVault.rewardsOf(vUSDC.address),
        dineroVenusVault.totalFreeUnderlying(USDC.address),
        dinero.balanceOf(alice.address),
      ]);

      expect(vaultVUSDCBalance).to.be.equal(0);
      expect(vUSDCUSDBalance).to.be.equal(0);
      expect(totalFreeVTokens).to.be.equal(0);
      expect(aliceAccount.vTokens).to.be.equal(0);
      expect(aliceAccount.principal).to.be.equal(0);
      expect(aliceAccount.rewardsPaid).to.be.equal(0);
      expect(aliceAccount.lossVTokensAccrued).to.be.equal(0);
      expect(rewards).to.be.equal(0);
      expect(totalFreeUnderlying).to.be.equal(0);
      expect(aliceDineroBalance).to.be.equal(0);

      const vTokensMinted = parseEther('100000')
        .mul(parseEther('1'))
        .div(exchangeRate);

      await expect(
        dineroVenusVault
          .connect(alice)
          .deposit(USDC.address, parseEther('100000'))
      )
        .to.emit(dineroVenusVault, 'Deposit')
        .withArgs(
          alice.address,
          USDC.address,
          parseEther('100000'),
          vTokensMinted
        )
        .to.emit(USDC, 'Transfer')
        .withArgs(alice.address, dineroVenusVault.address, parseEther('100000'))
        .to.emit(USDC, 'Transfer')
        .withArgs(dineroVenusVault.address, vUSDC.address, parseEther('100000'))
        .to.emit(vUSDC, 'Transfer')
        .withArgs(
          ethers.constants.AddressZero,
          dineroVenusVault.address,
          vTokensMinted
        )
        .to.not.emit(venusController, 'Claim')
        .to.not.emit(dineroVenusVault, 'Loss');

      const [
        aliceUSDCBalance2,
        vUSDCUSDBalance2,
        vaultVUSDCBalance2,
        totalFreeVTokens2,
        aliceAccount2,
        rewards2,
        totalFreeUnderlying2,
        aliceDineroBalance2,
      ] = await Promise.all([
        USDC.balanceOf(alice.address),
        USDC.balanceOf(vUSDC.address),
        vUSDC.balanceOf(dineroVenusVault.address),
        dineroVenusVault.totalFreeVTokenOf(vUSDC.address),
        dineroVenusVault.accountOf(USDC.address, alice.address),
        dineroVenusVault.rewardsOf(vUSDC.address),
        dineroVenusVault.totalFreeUnderlying(USDC.address),
        dinero.balanceOf(alice.address),
      ]);

      expect(
        aliceUSDCBalance2.eq(aliceUSDCBalance.sub(parseEther('100000')))
      ).equal(true);

      expect(vUSDCUSDBalance2).to.be.equal(parseEther('100000'));
      expect(vaultVUSDCBalance2).to.be.equal(vTokensMinted);
      expect(totalFreeVTokens2).to.be.equal(vTokensMinted);
      expect(rewards2).to.be.equal(0);
      expect(totalFreeUnderlying2).to.be.equal(parseEther('100000'));
      expect(aliceDineroBalance2).to.be.equal(parseEther('100000'));
      expect(aliceAccount2.vTokens).to.be.equal(vTokensMinted);
      expect(aliceAccount2.principal).to.be.equal(parseEther('100000'));
      expect(aliceAccount2.rewardsPaid).to.be.equal(0);
      expect(aliceAccount2.lossVTokensAccrued).to.be.equal(0);

      const wBNBXvsPairAddress = await factory.getPair(
        WBNB.address,
        XVS.address
      );

      const wBNBXvsPair = (
        await ethers.getContractFactory('PancakePair')
      ).attach(wBNBXvsPairAddress);

      await expect(
        dineroVenusVault.connect(bob).deposit(USDC.address, parseEther('100'))
      )
        .to.emit(venusController, 'Claim')
        .withArgs(dineroVenusVault.address, 0)
        // It does not swap if there are no XVS rewards
        .to.not.emit(wBNBXvsPair, 'Swap');
    });
    it('distributes rewards fairly', async () => {
      // Set XVS rewards
      const [exchangeRate, decimals] = await Promise.all([
        vUSDC.exchangeRateCurrent(),
        vUSDC.decimals(),
        venusController.__setClaimVenusValue(parseEther('1000')),
      ]);

      await dineroVenusVault
        .connect(alice)
        .deposit(USDC.address, parseEther('10000'));

      const [vaultVUSDCBalance, vUSDCRewards, aliceAccount, bobAccount] =
        await Promise.all([
          vUSDC.balanceOf(dineroVenusVault.address),
          dineroVenusVault.rewardsOf(vUSDC.address),
          dineroVenusVault.accountOf(USDC.address, alice.address),
          dineroVenusVault.accountOf(USDC.address, bob.address),
        ]);

      const aliceVTokensMinted = parseEther('10000')
        .mul(parseEther('1'))
        .div(exchangeRate);

      expect(vaultVUSDCBalance).to.be.equal(aliceVTokensMinted);
      expect(vUSDCRewards).to.be.equal(0);
      expect(aliceAccount.rewardsPaid).to.be.equal(0);
      expect(aliceAccount.vTokens).to.be.equal(vaultVUSDCBalance);
      expect(bobAccount.rewardsPaid).to.be.equal(0);
      expect(bobAccount.vTokens).to.be.equal(0);

      const wBNBXvsPairAddress = await factory.getPair(
        WBNB.address,
        XVS.address
      );

      const wBNBXvsPair = (
        await ethers.getContractFactory('PancakePair')
      ).attach(wBNBXvsPairAddress);

      await expect(
        dineroVenusVault.connect(bob).deposit(USDC.address, parseEther('20000'))
      )
        .to.emit(venusController, 'Claim')
        .withArgs(dineroVenusVault.address, parseEther('1000'))
        .to.emit(wBNBXvsPair, 'Swap');

      const [vaultVUSDCBalance2, vUSDCRewards2, aliceAccount2, bobAccount2] =
        await Promise.all([
          vUSDC.balanceOf(dineroVenusVault.address),
          dineroVenusVault.rewardsOf(vUSDC.address),
          dineroVenusVault.accountOf(USDC.address, alice.address),
          dineroVenusVault.accountOf(USDC.address, bob.address),
        ]);

      const bobVTokensMinted = parseEther('20000')
        .mul(parseEther('1'))
        .div(exchangeRate);

      const oneVToken = ethers.BigNumber.from(10).pow(
        ethers.BigNumber.from(decimals)
      );

      expect(
        vaultVUSDCBalance
          .add(bobVTokensMinted)
          .add(vUSDCRewards2.mul(vaultVUSDCBalance).div(oneVToken))
      ).to.be.closeTo(vaultVUSDCBalance2, 10 ** decimals); // 10 ** 8 represents 1 with 8 decimals

      expect(vUSDCRewards2).to.be.equal(
        vaultVUSDCBalance2
          .sub(vaultVUSDCBalance.add(bobVTokensMinted))
          .mul(oneVToken)
          .div(vaultVUSDCBalance)
      );
      expect(aliceAccount2.rewardsPaid).to.be.equal(0);
      expect(aliceAccount2.vTokens).to.be.equal(aliceVTokensMinted);
      expect(aliceAccount2.principal).to.be.equal(aliceAccount.principal);
      expect(bobAccount2.rewardsPaid).to.be.equal(
        bobVTokensMinted.mul(vUSDCRewards2).div(oneVToken)
      );
      expect(bobAccount2.vTokens).to.be.equal(bobVTokensMinted);
      expect(bobAccount2.principal).to.be.equal(parseEther('20000'));

      await dineroVenusVault
        .connect(alice)
        .deposit(USDC.address, parseEther('15000'));

      const [vaultVUSDCBalance3, vUSDCRewards3, aliceAccount3, bobAccount3] =
        await Promise.all([
          vUSDC.balanceOf(dineroVenusVault.address),
          dineroVenusVault.rewardsOf(vUSDC.address),
          dineroVenusVault.accountOf(USDC.address, alice.address),
          dineroVenusVault.accountOf(USDC.address, bob.address),
        ]);

      const aliceVTokensMinted2 = parseEther('15000')
        .mul(parseEther('1'))
        .div(exchangeRate);

      expect(vaultVUSDCBalance3).to.be.closeTo(
        vaultVUSDCBalance2
          .add(aliceVTokensMinted2)
          .add(
            vUSDCRewards3
              .sub(vUSDCRewards2)
              .mul(aliceVTokensMinted.add(bobVTokensMinted))
              .div(oneVToken)
          ),
        1e8
      );

      expect(aliceAccount3.vTokens).to.be.equal(
        aliceAccount2.vTokens
          .add(aliceVTokensMinted2)
          .add(vUSDCRewards3.mul(aliceAccount2.vTokens).div(oneVToken))
      );
      expect(aliceAccount3.principal).to.be.equal(
        aliceAccount2.principal.add(parseEther('15000'))
      );
      expect(aliceAccount3.rewardsPaid).to.be.equal(
        vUSDCRewards3.mul(aliceAccount3.vTokens).div(oneVToken)
      );

      expect(bobAccount3.principal).to.be.equal(bobAccount2.principal);
      expect(bobAccount3.vTokens).to.be.equal(bobAccount2.vTokens);
      expect(bobAccount3.rewardsPaid).to.be.equal(bobAccount2.rewardsPaid);

      await dineroVenusVault
        .connect(bob)
        .deposit(USDC.address, parseEther('35000'));

      const [
        vaultVUSDCBalance4,
        vUSDCRewards4,
        aliceAccount4,
        bobAccount4,
        aliceDineroBalance,
        bobDineroBalance,
        totalFreeVTokens,
        totalFreeUnderlying,
      ] = await Promise.all([
        vUSDC.balanceOf(dineroVenusVault.address),
        dineroVenusVault.rewardsOf(vUSDC.address),
        dineroVenusVault.accountOf(USDC.address, alice.address),
        dineroVenusVault.accountOf(USDC.address, bob.address),
        dinero.balanceOf(alice.address),
        dinero.balanceOf(bob.address),
        dineroVenusVault.totalFreeVTokenOf(vUSDC.address),
        dineroVenusVault.totalFreeUnderlying(USDC.address),
      ]);

      const bobVTokensMinted2 = parseEther('35000')
        .mul(parseEther('1'))
        .div(exchangeRate);

      expect(vaultVUSDCBalance4).to.be.closeTo(
        vaultVUSDCBalance3
          .add(bobVTokensMinted2)
          .add(
            vUSDCRewards4
              .sub(vUSDCRewards3)
              .mul(bobAccount3.vTokens.add(aliceAccount3.vTokens))
              .div(oneVToken)
          ),
        1e8
      );

      expect(bobAccount4.vTokens).to.be.equal(
        bobAccount3.vTokens
          .add(
            vUSDCRewards4
              .mul(bobAccount3.vTokens)
              .div(oneVToken)
              .sub(bobAccount3.rewardsPaid)
          )
          .add(bobVTokensMinted2)
      );
      expect(bobAccount4.principal).to.be.equal(
        bobAccount3.principal.add(parseEther('35000'))
      );
      expect(bobAccount4.rewardsPaid).to.be.equal(
        vUSDCRewards4.mul(bobAccount4.vTokens).div(oneVToken)
      );

      expect(aliceAccount4.principal).to.be.equal(aliceAccount3.principal);
      expect(aliceAccount4.vTokens).to.be.equal(aliceAccount3.vTokens);
      expect(aliceAccount4.rewardsPaid).to.be.equal(aliceAccount3.rewardsPaid);

      expect(aliceDineroBalance).to.be.equal(aliceAccount4.principal);
      expect(bobDineroBalance).to.be.equal(bobAccount4.principal);

      expect(totalFreeVTokens).to.be.equal(
        bobAccount4.vTokens.add(aliceAccount4.vTokens)
      );

      // The vault has no leverage
      expect(totalFreeUnderlying).to.be.within(
        // TS does not know that Chai supports big number in this matcher with waffle
        // @ts-expect-error
        vaultVUSDCBalance4.mul(exchangeRate).div(parseEther('1')),
        vaultVUSDCBalance4
          .mul(exchangeRate)
          .div(parseEther('1'))
          .add(parseEther('1'))
      );
    });
    it('calculates losses proportionally', async () => {
      // Need initial deposit to incur a loss
      await dineroVenusVault
        .connect(bob)
        .deposit(USDC.address, parseEther('100000'));

      // To emulate a real life scenario, losses only happen when we leverage the vault position.
      await dineroVenusVault.connect(bob).leverage(vUSDC.address);

      const [
        vaultBalanceOfUnderlying,
        totalFreeUnderlying,
        vUSDCTotalLoss,
        totalFreeVTokens,
        exchangeRate,
        decimals,
      ] = await Promise.all([
        vUSDC.balanceOfUnderlying(dineroVenusVault.address),
        dineroVenusVault.totalFreeUnderlying(USDC.address),
        dineroVenusVault.totalLossOf(vUSDC.address),
        dineroVenusVault.totalFreeVTokenOf(vUSDC.address),
        vUSDC.exchangeRateCurrent(),
        vUSDC.decimals(),
      ]);

      // Artificially cause a 10% loss on the vault from 100_000 USDC -> 90_000 USDC
      await vUSDC.__setBalanceOfUnderlying(
        dineroVenusVault.address,
        vaultBalanceOfUnderlying.sub(parseEther('10000'))
      );

      expect(vUSDCTotalLoss).to.be.equal(0);
      expect(totalFreeUnderlying).to.be.equal(parseEther('100000'));

      const oneVToken = ethers.BigNumber.from(10).pow(
        ethers.BigNumber.from(decimals)
      );

      const lossPerVToken = parseEther('10000')
        .mul(parseEther('1'))
        .div(exchangeRate)
        .mul(oneVToken)
        .div(totalFreeVTokens);

      // Alice should NOT incur a loss
      // Loss should be calculated
      await expect(
        dineroVenusVault
          .connect(alice)
          .deposit(USDC.address, parseEther('50000'))
      )
        .to.emit(dineroVenusVault, 'Loss')
        .withArgs(parseEther('100000'), parseEther('90000'), lossPerVToken);

      const [
        vaultBalanceOfUnderlying2,
        totalFreeUnderlying2,
        vUSDCTotalLoss2,
        totalFreeVTokens2,
        aliceAccount,
      ] = await Promise.all([
        vUSDC.balanceOfUnderlying(dineroVenusVault.address),
        dineroVenusVault.totalFreeUnderlying(USDC.address),
        dineroVenusVault.totalLossOf(vUSDC.address),
        dineroVenusVault.totalFreeVTokenOf(vUSDC.address),
        dineroVenusVault.accountOf(USDC.address, alice.address),
      ]);

      expect(vaultBalanceOfUnderlying2).to.be.equal(
        vaultBalanceOfUnderlying
          .sub(parseEther('10000'))
          .add(parseEther('50000'))
      );
      expect(totalFreeUnderlying2).to.be.equal(parseEther('140000'));
      expect(vUSDCTotalLoss2).to.be.equal(lossPerVToken);
      // Loss essentially happens after minting the vTokens.
      // Will look a bit different than real world because the exchange rate should change but should not change our calculations
      expect(totalFreeVTokens2).to.be.closeTo(
        totalFreeUnderlying2
          .add(parseEther('10000'))
          .mul(parseEther('1'))
          .div(exchangeRate),
        2
      );
      expect(aliceAccount.principal).to.be.equal(parseEther('50000'));
      // Alice should not incur any loss
      expect(aliceAccount.vTokens).to.be.equal(
        parseEther('50000').mul(parseEther('1')).div(exchangeRate)
      );
      expect(aliceAccount.rewardsPaid).to.be.equal(0);
      expect(aliceAccount.lossVTokensAccrued).to.be.equal(
        vUSDCTotalLoss2.mul(aliceAccount.vTokens).div(oneVToken)
      );

      // Bob should incur a loss
      // There should not record a second loss
      await expect(
        dineroVenusVault.connect(bob).deposit(USDC.address, parseEther('45000'))
      ).to.not.emit(dineroVenusVault, 'Loss');

      const [
        vaultBalanceOfUnderlying3,
        totalFreeUnderlying3,
        vUSDCTotalLoss3,
        totalFreeVTokens3,
        bobAccount,
      ] = await Promise.all([
        vUSDC.balanceOfUnderlying(dineroVenusVault.address),
        dineroVenusVault.totalFreeUnderlying(USDC.address),
        dineroVenusVault.totalLossOf(vUSDC.address),
        dineroVenusVault.totalFreeVTokenOf(vUSDC.address),
        dineroVenusVault.accountOf(USDC.address, bob.address),
      ]);

      const loss = vUSDCTotalLoss3
        .mul(parseEther('100000').mul(parseEther('1')).div(exchangeRate))
        .div(oneVToken);

      expect(vaultBalanceOfUnderlying3).to.be.equal(
        vaultBalanceOfUnderlying2.add(parseEther('45000'))
      );
      expect(totalFreeUnderlying3).to.be.equal(
        totalFreeUnderlying2.add(parseEther('45000'))
      );
      expect(vUSDCTotalLoss3).to.be.equal(vUSDCTotalLoss2);
      expect(totalFreeVTokens3).to.be.equal(
        totalFreeVTokens2
          .add(parseEther('45000').mul(parseEther('1')).div(exchangeRate))
          .sub(loss)
      );

      expect(bobAccount.principal).to.be.equal(parseEther('145000'));
      // Bob should incur a loss
      expect(bobAccount.vTokens).to.be.closeTo(
        bobAccount.principal.mul(parseEther('1')).div(exchangeRate).sub(loss),
        1
      );
      expect(bobAccount.rewardsPaid).to.be.equal(0);
      expect(bobAccount.lossVTokensAccrued).to.be.equal(
        bobAccount.vTokens.mul(vUSDCTotalLoss3).div(oneVToken)
      );
    });
  });
});
