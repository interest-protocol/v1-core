import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { ethers } from 'hardhat';

import { Dinero } from '../typechain';
import { deploy } from './lib/test-utils';

const { parseEther } = ethers.utils;

// @dev We do not need to test the functions inherited by open zeppelin contracts as they are already tested and audited
// The burn and burnFrom functions were copied from open zeppelin so we do not need to test them as well
describe('Dinero', () => {
  let dinero: Dinero;

  let owner: SignerWithAddress;
  let alice: SignerWithAddress;

  beforeEach(async () => {
    [[owner, alice], dinero] = await Promise.all([
      ethers.getSigners(),
      deploy('Dinero'),
    ]);
  });

  describe('function: mint', () => {
    it('reverts if an account without the MINTER_ROLE calls it', async () => {
      const amount = parseEther('10');

      await expect(
        dinero.connect(alice).mint(alice.address, amount)
      ).to.revertedWith(
        'AccessControl: account 0x70997970c51812dc3a010c7d01b50e0d17dc79c8 is missing role 0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6'
      );
    });
    it('creates new tokens', async () => {
      const amount = parseEther('10');

      expect(await dinero.balanceOf(alice.address)).to.be.equal(0);

      // Admin needs to grant the `MINTER_ROLE`
      await dinero
        .connect(owner)
        .grantRole(await dinero.MINTER_ROLE(), owner.address);

      await dinero.connect(owner).mint(alice.address, amount);

      expect(await dinero.balanceOf(alice.address)).to.be.equal(amount);
    });
  });
});
