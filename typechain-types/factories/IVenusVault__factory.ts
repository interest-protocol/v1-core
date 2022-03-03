/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IVenusVault, IVenusVaultInterface } from "../IVenusVault";

const _abi = [
  {
    inputs: [],
    name: "collateralLimit",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export class IVenusVault__factory {
  static readonly abi = _abi;
  static createInterface(): IVenusVaultInterface {
    return new utils.Interface(_abi) as IVenusVaultInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IVenusVault {
    return new Contract(address, _abi, signerOrProvider) as IVenusVault;
  }
}
