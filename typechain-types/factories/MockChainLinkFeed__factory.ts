/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  Overrides,
  BigNumberish,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  MockChainLinkFeed,
  MockChainLinkFeedInterface,
} from "../MockChainLinkFeed";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint8",
        name: "decimals_",
        type: "uint8",
      },
      {
        internalType: "string",
        name: "description_",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "version_",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "description",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint80",
        name: "",
        type: "uint80",
      },
    ],
    name: "getRoundData",
    outputs: [
      {
        internalType: "uint80",
        name: "roundId",
        type: "uint80",
      },
      {
        internalType: "int256",
        name: "answer",
        type: "int256",
      },
      {
        internalType: "uint256",
        name: "startedAt",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "updatedAt",
        type: "uint256",
      },
      {
        internalType: "uint80",
        name: "answeredInRound",
        type: "uint80",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "latestRoundData",
    outputs: [
      {
        internalType: "uint80",
        name: "roundId",
        type: "uint80",
      },
      {
        internalType: "int256",
        name: "answer",
        type: "int256",
      },
      {
        internalType: "uint256",
        name: "startedAt",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "updatedAt",
        type: "uint256",
      },
      {
        internalType: "uint80",
        name: "answeredInRound",
        type: "uint80",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "int256",
        name: "answer",
        type: "int256",
      },
    ],
    name: "setAnswer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "version",
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

const _bytecode =
  "0x608060405234801561001057600080fd5b5060405161052938038061052983398101604081905261002f9161010c565b6000805460ff191660ff8516179055815161005190600190602085019061005d565b506002555061023c9050565b82805461006990610201565b90600052602060002090601f01602090048101928261008b57600085556100d1565b82601f106100a457805160ff19168380011785556100d1565b828001600101855582156100d1579182015b828111156100d15782518255916020019190600101906100b6565b506100dd9291506100e1565b5090565b5b808211156100dd57600081556001016100e2565b634e487b7160e01b600052604160045260246000fd5b60008060006060848603121561012157600080fd5b835160ff8116811461013257600080fd5b602085810151919450906001600160401b038082111561015157600080fd5b818701915087601f83011261016557600080fd5b815181811115610177576101776100f6565b604051601f8201601f19908116603f0116810190838211818310171561019f5761019f6100f6565b816040528281528a868487010111156101b757600080fd5b600093505b828410156101d957848401860151818501870152928501926101bc565b828411156101ea5760008684830101525b809750505050505050604084015190509250925092565b600181811c9082168061021557607f821691505b6020821081141561023657634e487b7160e01b600052602260045260246000fd5b50919050565b6102de8061024b6000396000f3fe608060405234801561001057600080fd5b50600436106100625760003560e01c8063313ce5671461006757806354fd4d50146100815780637284e4161461009257806399213cd8146100a75780639a6fc8f5146100bc578063feaf968c14610120575b600080fd5b60005460405160ff90911681526020015b60405180910390f35b600254604051908152602001610078565b61009a61013a565b60405161007891906101cc565b6100ba6100b5366004610221565b600355565b005b6100e96100ca36600461023a565b5068020000000000031fb490640c3faa7553906361bd961d9081908490565b6040805169ffffffffffffffffffff968716815260208101959095528401929092526060830152909116608082015260a001610078565b60035468020000000000031fb4906361bd961d80836100e9565b6060600180546101499061026d565b80601f01602080910402602001604051908101604052809291908181526020018280546101759061026d565b80156101c25780601f10610197576101008083540402835291602001916101c2565b820191906000526020600020905b8154815290600101906020018083116101a557829003601f168201915b5050505050905090565b600060208083528351808285015260005b818110156101f9578581018301518582016040015282016101dd565b8181111561020b576000604083870101525b50601f01601f1916929092016040019392505050565b60006020828403121561023357600080fd5b5035919050565b60006020828403121561024c57600080fd5b813569ffffffffffffffffffff8116811461026657600080fd5b9392505050565b600181811c9082168061028157607f821691505b602082108114156102a257634e487b7160e01b600052602260045260246000fd5b5091905056fea264697066735822122088ce3e40f5a36d9dcf9fd31c78fd80a58e23e57c8f6c2b2f0c54b7600b580cea64736f6c634300080a0033";

type MockChainLinkFeedConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MockChainLinkFeedConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MockChainLinkFeed__factory extends ContractFactory {
  constructor(...args: MockChainLinkFeedConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "MockChainLinkFeed";
  }

  deploy(
    decimals_: BigNumberish,
    description_: string,
    version_: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<MockChainLinkFeed> {
    return super.deploy(
      decimals_,
      description_,
      version_,
      overrides || {}
    ) as Promise<MockChainLinkFeed>;
  }
  getDeployTransaction(
    decimals_: BigNumberish,
    description_: string,
    version_: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      decimals_,
      description_,
      version_,
      overrides || {}
    );
  }
  attach(address: string): MockChainLinkFeed {
    return super.attach(address) as MockChainLinkFeed;
  }
  connect(signer: Signer): MockChainLinkFeed__factory {
    return super.connect(signer) as MockChainLinkFeed__factory;
  }
  static readonly contractName: "MockChainLinkFeed";
  public readonly contractName: "MockChainLinkFeed";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MockChainLinkFeedInterface {
    return new utils.Interface(_abi) as MockChainLinkFeedInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MockChainLinkFeed {
    return new Contract(address, _abi, signerOrProvider) as MockChainLinkFeed;
  }
}
