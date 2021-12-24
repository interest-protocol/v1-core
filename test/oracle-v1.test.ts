import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { ethers } from 'hardhat';

import {
  MockChainLinkFeed,
  MockERC20,
  MockSimplePair,
  OracleV1,
} from '../typechain';
import { multiDeploy } from './lib/test-utils';

const { parseEther } = ethers.utils;

const INITIAL_TOKEN_SUPPLY = parseEther('1000');

const CAKE_USD_PRICE = ethers.BigNumber.from('1266591330');

const BNB_USD_PRICE = ethers.BigNumber.from('52817610666'); // ~ 528 USD

const CAKE_BNB_PRICE = ethers.BigNumber.from('23943667000000000');

describe('OracleV1', () => {
  let oracleV1: OracleV1;
  let mockBnbUsdDFeed: MockChainLinkFeed;
  let mockCakeUsdFeed: MockChainLinkFeed;
  let mockCakeBnbFeed: MockChainLinkFeed;

  let mockWbnb: MockERC20;
  let mockCake: MockERC20;

  let mockCakeBnbPair: MockSimplePair;

  let owner: SignerWithAddress;
  let alice: SignerWithAddress;

  let dudUsdFeed: string;
  let dudBnBFeed: string;

  beforeEach(async () => {
    [
      [mockBnbUsdDFeed, mockCakeUsdFeed, mockCakeBnbFeed, mockWbnb, mockCake],
      [owner, alice, { address: dudUsdFeed }, { address: dudBnBFeed }],
    ] = await Promise.all([
      multiDeploy(
        [
          'MockChainLinkFeed',
          'MockChainLinkFeed',
          'MockChainLinkFeed',
          'MockERC20',
          'MockERC20',
        ],
        [
          [8, 'BNB/USD', 1],
          [8, 'CAKE/USD', 1],
          [18, 'CAKE/BNB', 1],
          ['Wrapped BNB', 'WBNB', INITIAL_TOKEN_SUPPLY],
          ['Cake', 'CAKE', INITIAL_TOKEN_SUPPLY],
        ]
      ),
      ethers.getSigners(),
    ]);

    [[mockCakeBnbPair, oracleV1]] = await Promise.all([
      multiDeploy(
        ['MockSimplePair', 'OracleV1'],
        [
          [mockCake.address, mockWbnb.address, 'Cake-LP'],
          [mockBnbUsdDFeed.address, mockWbnb.address],
        ]
      ),
      // 1 BNB === ~528.18 USD
      mockBnbUsdDFeed.setAnswer(BNB_USD_PRICE),
      // 1 CAKE === ~12.67 USD
      mockCakeUsdFeed.setAnswer(CAKE_USD_PRICE),
      // 1 CAKE === ~0.024 BNB
      mockCakeBnbFeed.setAnswer(ethers.BigNumber.from('23943667000000000')),
    ]);

    await Promise.all([
      oracleV1
        .connect(owner)
        .setFeed(mockWbnb.address, mockBnbUsdDFeed.address, 0),
      oracleV1
        .connect(owner)
        .setFeed(mockCake.address, mockCakeUsdFeed.address, 0),
      oracleV1
        .connect(owner)
        .setFeed(mockCake.address, mockCakeBnbFeed.address, 1),
      mockCakeBnbPair.setTotalSupply(
        ethers.BigNumber.from('11954349886632348017853972')
      ),
      mockCakeBnbPair.setReserves(
        // Cake
        ethers.BigNumber.from('11954349886632348017853972'),
        // WBNB
        ethers.BigNumber.from('11954349886632348017853972')
      ),
    ]);
  });

  describe('function: getUSDPrice', () => {
    it('returns the value of pair in USD', async () => {
      expect(
        await oracleV1.getUSDPrice(mockCakeBnbPair.address, parseEther('1'))
      ).to.be.equal('163457208705960941160'); // ~163 USD which matches based on the reserve amounts + BNB price in USD
    });
    it('returns the value of an ERC20 in USD', async () => {
      expect(
        await oracleV1.getUSDPrice(mockCake.address, parseEther('2'))
      ).to.be.equal(CAKE_USD_PRICE.mul(2).mul(1e10)); // USD feeds are 8 decimal but contract converts all to 18
    });
  });

  describe('function: getTokenUSDPrice', () => {
    it('reverts if we ask for the price of the zero address', async () => {
      await expect(
        oracleV1.getTokenUSDPrice(ethers.constants.AddressZero, parseEther('1'))
      ).to.revertedWith('Oracle: no address zero');
    });
    it('returns the price of WBNB', async () => {
      expect(
        await oracleV1.getTokenUSDPrice(mockWbnb.address, parseEther('3'))
      ).to.be.equal(BNB_USD_PRICE.mul(3).mul(1e10)); // USD feeds are 8 decimal but contract converts all to 18
    });
    it('returns the price of any ERC20', async () => {
      expect(
        await oracleV1.getTokenUSDPrice(mockCake.address, parseEther('2'))
      ).to.be.equal(CAKE_USD_PRICE.mul(2).mul(1e10)); // USD feeds are 8 decimal but contract converts all to 18
    });
  });
  it('returns the USD and BNB price for a pair', async () => {
    const data = await oracleV1.getLPTokenPx(
      mockCakeBnbPair.address,
      parseEther('1')
    );
    expect(data[0]).to.be.equal('309474826000000000'); // 0.3 BNB which is ~ 163 dollars
    expect(data[1]).to.be.equal('163457208705960941160'); // 528 USD (BNB PRICE) * 0.309 BNB
  });
  it('returns the value of BNB for a pair', async () => {
    expect(
      await oracleV1.getLPTokenBNBPrice(mockCakeBnbPair.address)
    ).to.be.equal('309474826000000000');
  });
  describe('function: getTokenBNBPrice', () => {
    it('reverts if the token is the zero address', async () => {
      await expect(
        oracleV1.getTokenBNBPrice(ethers.constants.AddressZero, parseEther('1'))
      ).to.revertedWith('Oracle: no address zero');
    });
    it('returns the amount if we ask for the WBNB price as it is the underlying', async () => {
      expect(
        await oracleV1.getTokenBNBPrice(mockWbnb.address, parseEther('2'))
      ).to.be.equal(parseEther('2'));
    });
    it('returns the price of an ERC20 in BNB', async () => {
      expect(
        await oracleV1.getTokenBNBPrice(mockCake.address, parseEther('3'))
      ).to.be.equal(ethers.BigNumber.from(CAKE_BNB_PRICE.mul(3)));
    });
  });
  it('returns the price of BNB in USD', async () => {
    expect(await oracleV1.getBNBUSDPrice(parseEther('10'))).to.be.equal(
      BNB_USD_PRICE.mul(10).mul(1e10)
    );
  });
  describe('function: setFeed', () => {
    it('reverts if it is not called by the owner', async () => {
      await expect(
        oracleV1.connect(alice).setFeed(mockCake.address, dudBnBFeed, 1)
      ).to.revertedWith('Ownable: caller is not the owner');
    });
    it('updates a BNB feed', async () => {
      expect(await oracleV1.getBNBBaseFeeds(mockCake.address)).to.be.equal(
        mockCakeBnbFeed.address
      );
      expect(await oracleV1.getUSDBaseFeeds(mockCake.address)).to.be.equal(
        mockCakeUsdFeed.address
      );
      await oracleV1.connect(owner).setFeed(mockCake.address, dudBnBFeed, 1); // 1 means BNB feed;
      expect(await oracleV1.getBNBBaseFeeds(mockCake.address)).to.be.equal(
        dudBnBFeed
      );
      expect(await oracleV1.getUSDBaseFeeds(mockCake.address)).to.be.equal(
        mockCakeUsdFeed.address
      );
    });
    it('updates a USD feed', async () => {
      expect(await oracleV1.getUSDBaseFeeds(mockCake.address)).to.be.equal(
        mockCakeUsdFeed.address
      );
      expect(await oracleV1.getBNBBaseFeeds(mockCake.address)).to.be.equal(
        mockCakeBnbFeed.address
      );
      await oracleV1.connect(owner).setFeed(mockCake.address, dudUsdFeed, 0); // 0 means USD feed;
      expect(await oracleV1.getUSDBaseFeeds(mockCake.address)).to.be.equal(
        dudUsdFeed
      );
      expect(await oracleV1.getBNBBaseFeeds(mockCake.address)).to.be.equal(
        mockCakeBnbFeed.address
      );
    });
  });
});