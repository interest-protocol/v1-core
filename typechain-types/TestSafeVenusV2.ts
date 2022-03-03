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
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface TestSafeVenusV2Interface extends utils.Interface {
  contractName: "TestSafeVenusV2";
  functions: {
    "ORACLE()": FunctionFragment;
    "VENUS_CONTROLLER()": FunctionFragment;
    "XVS()": FunctionFragment;
    "borrowAndSupply(address,address)": FunctionFragment;
    "borrowInterestPerBlock(address,address,uint256)": FunctionFragment;
    "deleverage(address,address)": FunctionFragment;
    "initialize(address,address,address)": FunctionFragment;
    "isProfitable(address,address,uint256)": FunctionFragment;
    "owner()": FunctionFragment;
    "predictBorrowRate(address,uint256)": FunctionFragment;
    "predictSupplyRate(address,uint256)": FunctionFragment;
    "proxiableUUID()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "safeBorrow(address,address)": FunctionFragment;
    "safeCollateralRatio(address,address)": FunctionFragment;
    "safeRedeem(address,address)": FunctionFragment;
    "supplyRewardPerBlock(address,address,uint256)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "upgradeTo(address)": FunctionFragment;
    "upgradeToAndCall(address,bytes)": FunctionFragment;
    "version()": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "ORACLE", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "VENUS_CONTROLLER",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "XVS", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "borrowAndSupply",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "borrowInterestPerBlock",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "deleverage",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [string, string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "isProfitable",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "predictBorrowRate",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "predictSupplyRate",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "proxiableUUID",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "safeBorrow",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "safeCollateralRatio",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "safeRedeem",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "supplyRewardPerBlock",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "upgradeTo", values: [string]): string;
  encodeFunctionData(
    functionFragment: "upgradeToAndCall",
    values: [string, BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "version", values?: undefined): string;

  decodeFunctionResult(functionFragment: "ORACLE", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "VENUS_CONTROLLER",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "XVS", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "borrowAndSupply",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "borrowInterestPerBlock",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "deleverage", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isProfitable",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "predictBorrowRate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "predictSupplyRate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "proxiableUUID",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "safeBorrow", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "safeCollateralRatio",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "safeRedeem", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "supplyRewardPerBlock",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "upgradeTo", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "upgradeToAndCall",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "version", data: BytesLike): Result;

  events: {
    "AdminChanged(address,address)": EventFragment;
    "BeaconUpgraded(address)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "Upgraded(address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AdminChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "BeaconUpgraded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Upgraded"): EventFragment;
}

export type AdminChangedEvent = TypedEvent<
  [string, string],
  { previousAdmin: string; newAdmin: string }
>;

export type AdminChangedEventFilter = TypedEventFilter<AdminChangedEvent>;

export type BeaconUpgradedEvent = TypedEvent<[string], { beacon: string }>;

export type BeaconUpgradedEventFilter = TypedEventFilter<BeaconUpgradedEvent>;

export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  { previousOwner: string; newOwner: string }
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export type UpgradedEvent = TypedEvent<[string], { implementation: string }>;

export type UpgradedEventFilter = TypedEventFilter<UpgradedEvent>;

export interface TestSafeVenusV2 extends BaseContract {
  contractName: "TestSafeVenusV2";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: TestSafeVenusV2Interface;

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
    ORACLE(overrides?: CallOverrides): Promise<[string]>;

    VENUS_CONTROLLER(overrides?: CallOverrides): Promise<[string]>;

    XVS(overrides?: CallOverrides): Promise<[string]>;

    borrowAndSupply(
      vault: string,
      vToken: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    borrowInterestPerBlock(
      vault: string,
      vToken: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    deleverage(
      vault: string,
      vToken: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    initialize(
      venusController: string,
      xvs: string,
      oracle: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    isProfitable(
      vault: string,
      vToken: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    predictBorrowRate(
      vToken: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    predictSupplyRate(
      vToken: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    proxiableUUID(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    safeBorrow(
      vault: string,
      vToken: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    safeCollateralRatio(
      vault: string,
      vToken: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    safeRedeem(
      vault: string,
      vToken: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    supplyRewardPerBlock(
      vault: string,
      vToken: string,
      borrowAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    upgradeTo(
      newImplementation: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    upgradeToAndCall(
      newImplementation: string,
      data: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    version(overrides?: CallOverrides): Promise<[string]>;
  };

  ORACLE(overrides?: CallOverrides): Promise<string>;

  VENUS_CONTROLLER(overrides?: CallOverrides): Promise<string>;

  XVS(overrides?: CallOverrides): Promise<string>;

  borrowAndSupply(
    vault: string,
    vToken: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  borrowInterestPerBlock(
    vault: string,
    vToken: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  deleverage(
    vault: string,
    vToken: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  initialize(
    venusController: string,
    xvs: string,
    oracle: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  isProfitable(
    vault: string,
    vToken: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  owner(overrides?: CallOverrides): Promise<string>;

  predictBorrowRate(
    vToken: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  predictSupplyRate(
    vToken: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  proxiableUUID(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  safeBorrow(
    vault: string,
    vToken: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  safeCollateralRatio(
    vault: string,
    vToken: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  safeRedeem(
    vault: string,
    vToken: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  supplyRewardPerBlock(
    vault: string,
    vToken: string,
    borrowAmount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  upgradeTo(
    newImplementation: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  upgradeToAndCall(
    newImplementation: string,
    data: BytesLike,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  version(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    ORACLE(overrides?: CallOverrides): Promise<string>;

    VENUS_CONTROLLER(overrides?: CallOverrides): Promise<string>;

    XVS(overrides?: CallOverrides): Promise<string>;

    borrowAndSupply(
      vault: string,
      vToken: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { borrow: BigNumber; supply: BigNumber }
    >;

    borrowInterestPerBlock(
      vault: string,
      vToken: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber]>;

    deleverage(
      vault: string,
      vToken: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    initialize(
      venusController: string,
      xvs: string,
      oracle: string,
      overrides?: CallOverrides
    ): Promise<void>;

    isProfitable(
      vault: string,
      vToken: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    owner(overrides?: CallOverrides): Promise<string>;

    predictBorrowRate(
      vToken: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    predictSupplyRate(
      vToken: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    proxiableUUID(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    safeBorrow(
      vault: string,
      vToken: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    safeCollateralRatio(
      vault: string,
      vToken: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    safeRedeem(
      vault: string,
      vToken: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    supplyRewardPerBlock(
      vault: string,
      vToken: string,
      borrowAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    upgradeTo(
      newImplementation: string,
      overrides?: CallOverrides
    ): Promise<void>;

    upgradeToAndCall(
      newImplementation: string,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    version(overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    "AdminChanged(address,address)"(
      previousAdmin?: null,
      newAdmin?: null
    ): AdminChangedEventFilter;
    AdminChanged(
      previousAdmin?: null,
      newAdmin?: null
    ): AdminChangedEventFilter;

    "BeaconUpgraded(address)"(
      beacon?: string | null
    ): BeaconUpgradedEventFilter;
    BeaconUpgraded(beacon?: string | null): BeaconUpgradedEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;

    "Upgraded(address)"(implementation?: string | null): UpgradedEventFilter;
    Upgraded(implementation?: string | null): UpgradedEventFilter;
  };

  estimateGas: {
    ORACLE(overrides?: CallOverrides): Promise<BigNumber>;

    VENUS_CONTROLLER(overrides?: CallOverrides): Promise<BigNumber>;

    XVS(overrides?: CallOverrides): Promise<BigNumber>;

    borrowAndSupply(
      vault: string,
      vToken: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    borrowInterestPerBlock(
      vault: string,
      vToken: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    deleverage(
      vault: string,
      vToken: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    initialize(
      venusController: string,
      xvs: string,
      oracle: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    isProfitable(
      vault: string,
      vToken: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    predictBorrowRate(
      vToken: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    predictSupplyRate(
      vToken: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    proxiableUUID(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    safeBorrow(
      vault: string,
      vToken: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    safeCollateralRatio(
      vault: string,
      vToken: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    safeRedeem(
      vault: string,
      vToken: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    supplyRewardPerBlock(
      vault: string,
      vToken: string,
      borrowAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    upgradeTo(
      newImplementation: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    upgradeToAndCall(
      newImplementation: string,
      data: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    version(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    ORACLE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    VENUS_CONTROLLER(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    XVS(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    borrowAndSupply(
      vault: string,
      vToken: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    borrowInterestPerBlock(
      vault: string,
      vToken: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    deleverage(
      vault: string,
      vToken: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    initialize(
      venusController: string,
      xvs: string,
      oracle: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    isProfitable(
      vault: string,
      vToken: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    predictBorrowRate(
      vToken: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    predictSupplyRate(
      vToken: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    proxiableUUID(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    safeBorrow(
      vault: string,
      vToken: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    safeCollateralRatio(
      vault: string,
      vToken: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    safeRedeem(
      vault: string,
      vToken: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    supplyRewardPerBlock(
      vault: string,
      vToken: string,
      borrowAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    upgradeTo(
      newImplementation: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    upgradeToAndCall(
      newImplementation: string,
      data: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    version(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
