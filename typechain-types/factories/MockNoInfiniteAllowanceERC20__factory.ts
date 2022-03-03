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
  MockNoInfiniteAllowanceERC20,
  MockNoInfiniteAllowanceERC20Interface,
} from "../MockNoInfiniteAllowanceERC20";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "initialSupply",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
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
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
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
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
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
    inputs: [],
    name: "symbol",
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
    inputs: [],
    name: "totalSupply",
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
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162000da238038062000da28339810160408190526200003491620002e9565b8251839083906200004d90600390602085019062000176565b5080516200006390600490602084019062000176565b505050620000816200007a6200008a60201b60201c565b826200008e565b505050620003c0565b3390565b6001600160a01b038216620000e95760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015260640160405180910390fd5b8060026000828254620000fd91906200035c565b90915550506001600160a01b038216600090815260208190526040812080548392906200012c9084906200035c565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b828054620001849062000383565b90600052602060002090601f016020900481019282620001a85760008555620001f3565b82601f10620001c357805160ff1916838001178555620001f3565b82800160010185558215620001f3579182015b82811115620001f3578251825591602001919060010190620001d6565b506200020192915062000205565b5090565b5b8082111562000201576000815560010162000206565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200024457600080fd5b81516001600160401b03808211156200026157620002616200021c565b604051601f8301601f19908116603f011681019082821181831017156200028c576200028c6200021c565b81604052838152602092508683858801011115620002a957600080fd5b600091505b83821015620002cd5785820183015181830184015290820190620002ae565b83821115620002df5760008385830101525b9695505050505050565b600080600060608486031215620002ff57600080fd5b83516001600160401b03808211156200031757600080fd5b620003258783880162000232565b945060208601519150808211156200033c57600080fd5b506200034b8682870162000232565b925050604084015190509250925092565b600082198211156200037e57634e487b7160e01b600052601160045260246000fd5b500190565b600181811c908216806200039857607f821691505b60208210811415620003ba57634e487b7160e01b600052602260045260246000fd5b50919050565b6109d280620003d06000396000f3fe608060405234801561001057600080fd5b50600436106100b45760003560e01c806340c10f191161007157806340c10f191461014157806370a082311461015657806395d89b411461017f578063a457c2d714610187578063a9059cbb1461019a578063dd62ed3e146101ad57600080fd5b806306fdde03146100b9578063095ea7b3146100d757806318160ddd146100fa57806323b872dd1461010c578063313ce5671461011f578063395093511461012e575b600080fd5b6100c16101e6565b6040516100ce919061080f565b60405180910390f35b6100ea6100e5366004610880565b610278565b60405190151581526020016100ce565b6002545b6040519081526020016100ce565b6100ea61011a3660046108aa565b610290565b604051601281526020016100ce565b6100ea61013c366004610880565b6102b4565b61015461014f366004610880565b6102f3565b005b6100fe6101643660046108e6565b6001600160a01b031660009081526020819052604090205490565b6100c1610301565b6100ea610195366004610880565b610310565b6100ea6101a8366004610880565b6103a7565b6100fe6101bb366004610908565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6060600380546101f59061093b565b80601f01602080910402602001604051908101604052809291908181526020018280546102219061093b565b801561026e5780601f106102435761010080835404028352916020019161026e565b820191906000526020600020905b81548152906001019060200180831161025157829003601f168201915b5050505050905090565b6000336102868185856103b5565b5060019392505050565b60003361029e8582856104d9565b6102a9858585610562565b506001949350505050565b3360008181526001602090815260408083206001600160a01b038716845290915281205490919061028690829086906102ee908790610976565b6103b5565b6102fd8282610730565b5050565b6060600480546101f59061093b565b3360008181526001602090815260408083206001600160a01b03871684529091528120549091908381101561039a5760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b60648201526084015b60405180910390fd5b6102a982868684036103b5565b600033610286818585610562565b6001600160a01b0383166104175760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b6064820152608401610391565b6001600160a01b0382166104785760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b6064820152608401610391565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b6001600160a01b038381166000908152600160209081526040808320938616835292905220548181101561054f5760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e63650000006044820152606401610391565b61055c84848484036103b5565b50505050565b6001600160a01b0383166105c65760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b6064820152608401610391565b6001600160a01b0382166106285760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b6064820152608401610391565b6001600160a01b038316600090815260208190526040902054818110156106a05760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b6064820152608401610391565b6001600160a01b038085166000908152602081905260408082208585039055918516815290812080548492906106d7908490610976565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8460405161072391815260200190565b60405180910390a361055c565b6001600160a01b0382166107865760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f2061646472657373006044820152606401610391565b80600260008282546107989190610976565b90915550506001600160a01b038216600090815260208190526040812080548392906107c5908490610976565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b600060208083528351808285015260005b8181101561083c57858101830151858201604001528201610820565b8181111561084e576000604083870101525b50601f01601f1916929092016040019392505050565b80356001600160a01b038116811461087b57600080fd5b919050565b6000806040838503121561089357600080fd5b61089c83610864565b946020939093013593505050565b6000806000606084860312156108bf57600080fd5b6108c884610864565b92506108d660208501610864565b9150604084013590509250925092565b6000602082840312156108f857600080fd5b61090182610864565b9392505050565b6000806040838503121561091b57600080fd5b61092483610864565b915061093260208401610864565b90509250929050565b600181811c9082168061094f57607f821691505b6020821081141561097057634e487b7160e01b600052602260045260246000fd5b50919050565b6000821982111561099757634e487b7160e01b600052601160045260246000fd5b50019056fea2646970667358221220fef782d741696a6a6f84cad524b2ed6864dd504e66067980b891038035280f3264736f6c634300080a0033";

type MockNoInfiniteAllowanceERC20ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MockNoInfiniteAllowanceERC20ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MockNoInfiniteAllowanceERC20__factory extends ContractFactory {
  constructor(...args: MockNoInfiniteAllowanceERC20ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "MockNoInfiniteAllowanceERC20";
  }

  deploy(
    name: string,
    symbol: string,
    initialSupply: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<MockNoInfiniteAllowanceERC20> {
    return super.deploy(
      name,
      symbol,
      initialSupply,
      overrides || {}
    ) as Promise<MockNoInfiniteAllowanceERC20>;
  }
  getDeployTransaction(
    name: string,
    symbol: string,
    initialSupply: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      name,
      symbol,
      initialSupply,
      overrides || {}
    );
  }
  attach(address: string): MockNoInfiniteAllowanceERC20 {
    return super.attach(address) as MockNoInfiniteAllowanceERC20;
  }
  connect(signer: Signer): MockNoInfiniteAllowanceERC20__factory {
    return super.connect(signer) as MockNoInfiniteAllowanceERC20__factory;
  }
  static readonly contractName: "MockNoInfiniteAllowanceERC20";
  public readonly contractName: "MockNoInfiniteAllowanceERC20";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MockNoInfiniteAllowanceERC20Interface {
    return new utils.Interface(_abi) as MockNoInfiniteAllowanceERC20Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MockNoInfiniteAllowanceERC20 {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as MockNoInfiniteAllowanceERC20;
  }
}
