/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  MockLibraryWrapper,
  MockLibraryWrapperInterface,
} from "../MockLibraryWrapper";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "currentCumulativePrices",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pair",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "pairFor",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_pair",
        type: "address",
      },
    ],
    name: "setPair",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenA",
        type: "address",
      },
      {
        internalType: "address",
        name: "tokenB",
        type: "address",
      },
    ],
    name: "sortTokens",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50610966806100206000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c80633f14dccd1461005c578063544caa56146100955780636d91c0e2146100c85780638187f516146100f3578063a8aa1b3114610125575b600080fd5b61006f61006a366004610758565b610138565b60408051938452602084019290925263ffffffff16908201526060015b60405180910390f35b6100a86100a3366004610773565b61015f565b604080516001600160a01b0393841681529290911660208301520161008c565b6100db6100d63660046107a6565b610178565b6040516001600160a01b03909116815260200161008c565b610123610101366004610758565b600080546001600160a01b0319166001600160a01b0392909216919091179055565b005b6000546100db906001600160a01b031681565b6000805481908190610152906001600160a01b031661018c565b9250925092509193909250565b60008061016c8484610383565b915091505b9250929050565b6000546001600160a01b03165b9392505050565b600080600061019961046b565b9050836001600160a01b0316635909c0d56040518163ffffffff1660e01b8152600401602060405180830381865afa1580156101d9573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101fd91906107e9565b9250836001600160a01b0316635a3d54936040518163ffffffff1660e01b8152600401602060405180830381865afa15801561023d573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061026191906107e9565b91506000806000866001600160a01b0316630902f1ac6040518163ffffffff1660e01b8152600401606060405180830381865afa1580156102a6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102ca9190610819565b9250925092508363ffffffff168163ffffffff16146103795760006102ef828661087f565b90508063ffffffff16610314846001600160701b0316866001600160701b0316610481565b5161032891906001600160e01b03166108a4565b61033290886108c3565b96508063ffffffff16610357856001600160701b0316856001600160701b0316610481565b5161036b91906001600160e01b03166108a4565b61037590876108c3565b9550505b5050509193909250565b600080826001600160a01b0316846001600160a01b031614156103ed5760405162461bcd60e51b815260206004820152601f60248201527f50616e63616b654c69623a204944454e544943414c5f4144445245535345530060448201526064015b60405180910390fd5b826001600160a01b0316846001600160a01b03161061040d578284610410565b83835b90925090506001600160a01b0382166101715760405162461bcd60e51b815260206004820152601860248201527f50616e63616b654c69623a205a45524f5f41444452455353000000000000000060448201526064016103e4565b600061047c640100000000426108f1565b905090565b604080516020810190915260008152600082116104ef5760405162461bcd60e51b815260206004820152602660248201527f4669786564506f696e743a3a6672616374696f6e3a206469766973696f6e206260448201526579207a65726f60d01b60648201526084016103e4565b8261050957506040805160208101909152600081526105bc565b71ffffffffffffffffffffffffffffffffffff83116105ab57600061053283607086901b610905565b90506001600160e01b0381111561058b5760405162461bcd60e51b815260206004820152601e60248201527f4669786564506f696e743a3a6672616374696f6e3a206f766572666c6f77000060448201526064016103e4565b6040518060200160405280826001600160e01b03168152509150506105bc565b600061053284600160701b856105c2565b92915050565b6000808060001985870985870292508281108382030391505080600014156105fc57600084116105f157600080fd5b508290049050610185565b80841161060857600080fd5b6000848688098084039381119092039190506000610628861960016108c3565b861695869004959384900493600081900304600101905061064981846108a4565b90931792600061065a8760036108a4565b600218905061066981886108a4565b610674906002610919565b61067e90826108a4565b905061068a81886108a4565b610695906002610919565b61069f90826108a4565b90506106ab81886108a4565b6106b6906002610919565b6106c090826108a4565b90506106cc81886108a4565b6106d7906002610919565b6106e190826108a4565b90506106ed81886108a4565b6106f8906002610919565b61070290826108a4565b905061070e81886108a4565b610719906002610919565b61072390826108a4565b905061072f81866108a4565b9998505050505050505050565b80356001600160a01b038116811461075357600080fd5b919050565b60006020828403121561076a57600080fd5b6101858261073c565b6000806040838503121561078657600080fd5b61078f8361073c565b915061079d6020840161073c565b90509250929050565b6000806000606084860312156107bb57600080fd5b6107c48461073c565b92506107d26020850161073c565b91506107e06040850161073c565b90509250925092565b6000602082840312156107fb57600080fd5b5051919050565b80516001600160701b038116811461075357600080fd5b60008060006060848603121561082e57600080fd5b61083784610802565b925061084560208501610802565b9150604084015163ffffffff8116811461085e57600080fd5b809150509250925092565b634e487b7160e01b600052601160045260246000fd5b600063ffffffff8381169083168181101561089c5761089c610869565b039392505050565b60008160001904831182151516156108be576108be610869565b500290565b600082198211156108d6576108d6610869565b500190565b634e487b7160e01b600052601260045260246000fd5b600082610900576109006108db565b500690565b600082610914576109146108db565b500490565b60008282101561092b5761092b610869565b50039056fea2646970667358221220b9eef3c2a0b3ead43b487bb276ba728e2a5c3e5c8b755875c6d6348e5eb3624464736f6c634300080a0033";

type MockLibraryWrapperConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MockLibraryWrapperConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MockLibraryWrapper__factory extends ContractFactory {
  constructor(...args: MockLibraryWrapperConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "MockLibraryWrapper";
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<MockLibraryWrapper> {
    return super.deploy(overrides || {}) as Promise<MockLibraryWrapper>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): MockLibraryWrapper {
    return super.attach(address) as MockLibraryWrapper;
  }
  connect(signer: Signer): MockLibraryWrapper__factory {
    return super.connect(signer) as MockLibraryWrapper__factory;
  }
  static readonly contractName: "MockLibraryWrapper";
  public readonly contractName: "MockLibraryWrapper";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MockLibraryWrapperInterface {
    return new utils.Interface(_abi) as MockLibraryWrapperInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MockLibraryWrapper {
    return new Contract(address, _abi, signerOrProvider) as MockLibraryWrapper;
  }
}
