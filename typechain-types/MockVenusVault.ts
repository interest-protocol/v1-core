/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface MockVenusVaultInterface extends utils.Interface {
  contractName: "MockVenusVault";
  functions: {
    "collateralLimit()": FunctionFragment;
    "setCollateralLimit(uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "collateralLimit",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setCollateralLimit",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "collateralLimit",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setCollateralLimit",
    data: BytesLike
  ): Result;

  events: {};
}

export interface MockVenusVault extends BaseContract {
  contractName: "MockVenusVault";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: MockVenusVaultInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    collateralLimit(overrides?: CallOverrides): Promise<[BigNumber]>;

    setCollateralLimit(
      _collateralLimit: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  collateralLimit(overrides?: CallOverrides): Promise<BigNumber>;

  setCollateralLimit(
    _collateralLimit: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    collateralLimit(overrides?: CallOverrides): Promise<BigNumber>;

    setCollateralLimit(
      _collateralLimit: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    collateralLimit(overrides?: CallOverrides): Promise<BigNumber>;

    setCollateralLimit(
      _collateralLimit: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    collateralLimit(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setCollateralLimit(
      _collateralLimit: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
