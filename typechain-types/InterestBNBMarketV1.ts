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

export interface InterestBNBMarketV1Interface extends utils.Interface {
  contractName: "InterestBNBMarketV1";
  functions: {
    "DINERO()": FunctionFragment;
    "FEE_TO()": FunctionFragment;
    "ORACLE()": FunctionFragment;
    "ROUTER()": FunctionFragment;
    "accrue()": FunctionFragment;
    "addCollateral(address)": FunctionFragment;
    "borrow(address,uint256)": FunctionFragment;
    "exchangeRate()": FunctionFragment;
    "getEarnings()": FunctionFragment;
    "initialize(address,address,address,address,uint64,uint256,uint256)": FunctionFragment;
    "liquidate(address[],uint256[],address,address[])": FunctionFragment;
    "liquidationFee()": FunctionFragment;
    "loan()": FunctionFragment;
    "maxLTVRatio()": FunctionFragment;
    "owner()": FunctionFragment;
    "proxiableUUID()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "repay(address,uint256)": FunctionFragment;
    "setInterestRate(uint64)": FunctionFragment;
    "setLiquidationFee(uint256)": FunctionFragment;
    "setMaxLTVRatio(uint256)": FunctionFragment;
    "totalLoan()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "updateExchangeRate()": FunctionFragment;
    "upgradeTo(address)": FunctionFragment;
    "upgradeToAndCall(address,bytes)": FunctionFragment;
    "userCollateral(address)": FunctionFragment;
    "userLoan(address)": FunctionFragment;
    "withdrawCollateral(address,uint256)": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "DINERO", values?: undefined): string;
  encodeFunctionData(functionFragment: "FEE_TO", values?: undefined): string;
  encodeFunctionData(functionFragment: "ORACLE", values?: undefined): string;
  encodeFunctionData(functionFragment: "ROUTER", values?: undefined): string;
  encodeFunctionData(functionFragment: "accrue", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "addCollateral",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "borrow",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "exchangeRate",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getEarnings",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [
      string,
      string,
      string,
      string,
      BigNumberish,
      BigNumberish,
      BigNumberish
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "liquidate",
    values: [string[], BigNumberish[], string, string[]]
  ): string;
  encodeFunctionData(
    functionFragment: "liquidationFee",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "loan", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "maxLTVRatio",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "proxiableUUID",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "repay",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setInterestRate",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setLiquidationFee",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setMaxLTVRatio",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "totalLoan", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "updateExchangeRate",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "upgradeTo", values: [string]): string;
  encodeFunctionData(
    functionFragment: "upgradeToAndCall",
    values: [string, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "userCollateral",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "userLoan", values: [string]): string;
  encodeFunctionData(
    functionFragment: "withdrawCollateral",
    values: [string, BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "DINERO", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "FEE_TO", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "ORACLE", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "ROUTER", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "accrue", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "addCollateral",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "borrow", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "exchangeRate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getEarnings",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "liquidate", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "liquidationFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "loan", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "maxLTVRatio",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "proxiableUUID",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "repay", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setInterestRate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setLiquidationFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setMaxLTVRatio",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "totalLoan", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateExchangeRate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "upgradeTo", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "upgradeToAndCall",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "userCollateral",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "userLoan", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "withdrawCollateral",
    data: BytesLike
  ): Result;

  events: {
    "Accrue(uint256)": EventFragment;
    "AddCollateral(address,address,uint256)": EventFragment;
    "AdminChanged(address,address)": EventFragment;
    "BeaconUpgraded(address)": EventFragment;
    "Borrow(address,address,uint256,uint256)": EventFragment;
    "ExchangeRate(uint256)": EventFragment;
    "GetEarnings(address,uint256)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "Repay(address,address,uint256,uint256)": EventFragment;
    "Upgraded(address)": EventFragment;
    "WithdrawCollateral(address,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Accrue"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "AddCollateral"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "AdminChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "BeaconUpgraded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Borrow"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ExchangeRate"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "GetEarnings"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Repay"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Upgraded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "WithdrawCollateral"): EventFragment;
}

export type AccrueEvent = TypedEvent<[BigNumber], { accruedAmount: BigNumber }>;

export type AccrueEventFilter = TypedEventFilter<AccrueEvent>;

export type AddCollateralEvent = TypedEvent<
  [string, string, BigNumber],
  { from: string; to: string; amount: BigNumber }
>;

export type AddCollateralEventFilter = TypedEventFilter<AddCollateralEvent>;

export type AdminChangedEvent = TypedEvent<
  [string, string],
  { previousAdmin: string; newAdmin: string }
>;

export type AdminChangedEventFilter = TypedEventFilter<AdminChangedEvent>;

export type BeaconUpgradedEvent = TypedEvent<[string], { beacon: string }>;

export type BeaconUpgradedEventFilter = TypedEventFilter<BeaconUpgradedEvent>;

export type BorrowEvent = TypedEvent<
  [string, string, BigNumber, BigNumber],
  { from: string; to: string; principal: BigNumber; amount: BigNumber }
>;

export type BorrowEventFilter = TypedEventFilter<BorrowEvent>;

export type ExchangeRateEvent = TypedEvent<[BigNumber], { rate: BigNumber }>;

export type ExchangeRateEventFilter = TypedEventFilter<ExchangeRateEvent>;

export type GetEarningsEvent = TypedEvent<
  [string, BigNumber],
  { treasury: string; amount: BigNumber }
>;

export type GetEarningsEventFilter = TypedEventFilter<GetEarningsEvent>;

export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  { previousOwner: string; newOwner: string }
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export type RepayEvent = TypedEvent<
  [string, string, BigNumber, BigNumber],
  { payer: string; borrower: string; principal: BigNumber; debt: BigNumber }
>;

export type RepayEventFilter = TypedEventFilter<RepayEvent>;

export type UpgradedEvent = TypedEvent<[string], { implementation: string }>;

export type UpgradedEventFilter = TypedEventFilter<UpgradedEvent>;

export type WithdrawCollateralEvent = TypedEvent<
  [string, string, BigNumber],
  { from: string; to: string; amount: BigNumber }
>;

export type WithdrawCollateralEventFilter =
  TypedEventFilter<WithdrawCollateralEvent>;

export interface InterestBNBMarketV1 extends BaseContract {
  contractName: "InterestBNBMarketV1";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: InterestBNBMarketV1Interface;

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
    DINERO(overrides?: CallOverrides): Promise<[string]>;

    FEE_TO(overrides?: CallOverrides): Promise<[string]>;

    ORACLE(overrides?: CallOverrides): Promise<[string]>;

    ROUTER(overrides?: CallOverrides): Promise<[string]>;

    accrue(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    addCollateral(
      to: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    borrow(
      to: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    exchangeRate(overrides?: CallOverrides): Promise<[BigNumber]>;

    getEarnings(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    initialize(
      router: string,
      dinero: string,
      feeTo: string,
      oracle: string,
      interestRate: BigNumberish,
      _maxLTVRatio: BigNumberish,
      _liquidationFee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    liquidate(
      accounts: string[],
      principals: BigNumberish[],
      recipient: string,
      path: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    liquidationFee(overrides?: CallOverrides): Promise<[BigNumber]>;

    loan(
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber] & {
        lastAccrued: BigNumber;
        INTEREST_RATE: BigNumber;
        feesEarned: BigNumber;
      }
    >;

    maxLTVRatio(overrides?: CallOverrides): Promise<[BigNumber]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    proxiableUUID(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    repay(
      account: string,
      principal: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setInterestRate(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setLiquidationFee(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setMaxLTVRatio(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    totalLoan(
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { elastic: BigNumber; base: BigNumber }
    >;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    updateExchangeRate(
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

    userCollateral(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    userLoan(arg0: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    withdrawCollateral(
      to: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  DINERO(overrides?: CallOverrides): Promise<string>;

  FEE_TO(overrides?: CallOverrides): Promise<string>;

  ORACLE(overrides?: CallOverrides): Promise<string>;

  ROUTER(overrides?: CallOverrides): Promise<string>;

  accrue(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  addCollateral(
    to: string,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  borrow(
    to: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  exchangeRate(overrides?: CallOverrides): Promise<BigNumber>;

  getEarnings(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  initialize(
    router: string,
    dinero: string,
    feeTo: string,
    oracle: string,
    interestRate: BigNumberish,
    _maxLTVRatio: BigNumberish,
    _liquidationFee: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  liquidate(
    accounts: string[],
    principals: BigNumberish[],
    recipient: string,
    path: string[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  liquidationFee(overrides?: CallOverrides): Promise<BigNumber>;

  loan(
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, BigNumber] & {
      lastAccrued: BigNumber;
      INTEREST_RATE: BigNumber;
      feesEarned: BigNumber;
    }
  >;

  maxLTVRatio(overrides?: CallOverrides): Promise<BigNumber>;

  owner(overrides?: CallOverrides): Promise<string>;

  proxiableUUID(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  repay(
    account: string,
    principal: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setInterestRate(
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setLiquidationFee(
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setMaxLTVRatio(
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  totalLoan(
    overrides?: CallOverrides
  ): Promise<[BigNumber, BigNumber] & { elastic: BigNumber; base: BigNumber }>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  updateExchangeRate(
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

  userCollateral(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  userLoan(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  withdrawCollateral(
    to: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    DINERO(overrides?: CallOverrides): Promise<string>;

    FEE_TO(overrides?: CallOverrides): Promise<string>;

    ORACLE(overrides?: CallOverrides): Promise<string>;

    ROUTER(overrides?: CallOverrides): Promise<string>;

    accrue(overrides?: CallOverrides): Promise<void>;

    addCollateral(to: string, overrides?: CallOverrides): Promise<void>;

    borrow(
      to: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    exchangeRate(overrides?: CallOverrides): Promise<BigNumber>;

    getEarnings(overrides?: CallOverrides): Promise<void>;

    initialize(
      router: string,
      dinero: string,
      feeTo: string,
      oracle: string,
      interestRate: BigNumberish,
      _maxLTVRatio: BigNumberish,
      _liquidationFee: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    liquidate(
      accounts: string[],
      principals: BigNumberish[],
      recipient: string,
      path: string[],
      overrides?: CallOverrides
    ): Promise<void>;

    liquidationFee(overrides?: CallOverrides): Promise<BigNumber>;

    loan(
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber] & {
        lastAccrued: BigNumber;
        INTEREST_RATE: BigNumber;
        feesEarned: BigNumber;
      }
    >;

    maxLTVRatio(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<string>;

    proxiableUUID(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    repay(
      account: string,
      principal: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setInterestRate(
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setLiquidationFee(
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setMaxLTVRatio(
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    totalLoan(
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { elastic: BigNumber; base: BigNumber }
    >;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    updateExchangeRate(overrides?: CallOverrides): Promise<BigNumber>;

    upgradeTo(
      newImplementation: string,
      overrides?: CallOverrides
    ): Promise<void>;

    upgradeToAndCall(
      newImplementation: string,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    userCollateral(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    userLoan(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    withdrawCollateral(
      to: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "Accrue(uint256)"(accruedAmount?: null): AccrueEventFilter;
    Accrue(accruedAmount?: null): AccrueEventFilter;

    "AddCollateral(address,address,uint256)"(
      from?: string | null,
      to?: string | null,
      amount?: null
    ): AddCollateralEventFilter;
    AddCollateral(
      from?: string | null,
      to?: string | null,
      amount?: null
    ): AddCollateralEventFilter;

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

    "Borrow(address,address,uint256,uint256)"(
      from?: string | null,
      to?: string | null,
      principal?: null,
      amount?: null
    ): BorrowEventFilter;
    Borrow(
      from?: string | null,
      to?: string | null,
      principal?: null,
      amount?: null
    ): BorrowEventFilter;

    "ExchangeRate(uint256)"(rate?: null): ExchangeRateEventFilter;
    ExchangeRate(rate?: null): ExchangeRateEventFilter;

    "GetEarnings(address,uint256)"(
      treasury?: string | null,
      amount?: null
    ): GetEarningsEventFilter;
    GetEarnings(
      treasury?: string | null,
      amount?: null
    ): GetEarningsEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;

    "Repay(address,address,uint256,uint256)"(
      payer?: string | null,
      borrower?: string | null,
      principal?: null,
      debt?: null
    ): RepayEventFilter;
    Repay(
      payer?: string | null,
      borrower?: string | null,
      principal?: null,
      debt?: null
    ): RepayEventFilter;

    "Upgraded(address)"(implementation?: string | null): UpgradedEventFilter;
    Upgraded(implementation?: string | null): UpgradedEventFilter;

    "WithdrawCollateral(address,address,uint256)"(
      from?: string | null,
      to?: string | null,
      amount?: null
    ): WithdrawCollateralEventFilter;
    WithdrawCollateral(
      from?: string | null,
      to?: string | null,
      amount?: null
    ): WithdrawCollateralEventFilter;
  };

  estimateGas: {
    DINERO(overrides?: CallOverrides): Promise<BigNumber>;

    FEE_TO(overrides?: CallOverrides): Promise<BigNumber>;

    ORACLE(overrides?: CallOverrides): Promise<BigNumber>;

    ROUTER(overrides?: CallOverrides): Promise<BigNumber>;

    accrue(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    addCollateral(
      to: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    borrow(
      to: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    exchangeRate(overrides?: CallOverrides): Promise<BigNumber>;

    getEarnings(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    initialize(
      router: string,
      dinero: string,
      feeTo: string,
      oracle: string,
      interestRate: BigNumberish,
      _maxLTVRatio: BigNumberish,
      _liquidationFee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    liquidate(
      accounts: string[],
      principals: BigNumberish[],
      recipient: string,
      path: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    liquidationFee(overrides?: CallOverrides): Promise<BigNumber>;

    loan(overrides?: CallOverrides): Promise<BigNumber>;

    maxLTVRatio(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    proxiableUUID(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    repay(
      account: string,
      principal: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setInterestRate(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setLiquidationFee(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setMaxLTVRatio(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    totalLoan(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    updateExchangeRate(
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

    userCollateral(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    userLoan(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    withdrawCollateral(
      to: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    DINERO(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    FEE_TO(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    ORACLE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    ROUTER(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    accrue(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    addCollateral(
      to: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    borrow(
      to: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    exchangeRate(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getEarnings(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    initialize(
      router: string,
      dinero: string,
      feeTo: string,
      oracle: string,
      interestRate: BigNumberish,
      _maxLTVRatio: BigNumberish,
      _liquidationFee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    liquidate(
      accounts: string[],
      principals: BigNumberish[],
      recipient: string,
      path: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    liquidationFee(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    loan(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    maxLTVRatio(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    proxiableUUID(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    repay(
      account: string,
      principal: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setInterestRate(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setLiquidationFee(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setMaxLTVRatio(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    totalLoan(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    updateExchangeRate(
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

    userCollateral(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    userLoan(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    withdrawCollateral(
      to: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
