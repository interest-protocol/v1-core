/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  TestSafeVenusV2,
  TestSafeVenusV2Interface,
} from "../TestSafeVenusV2";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "previousAdmin",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "AdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "beacon",
        type: "address",
      },
    ],
    name: "BeaconUpgraded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "Upgraded",
    type: "event",
  },
  {
    inputs: [],
    name: "ORACLE",
    outputs: [
      {
        internalType: "contract OracleV1",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "VENUS_CONTROLLER",
    outputs: [
      {
        internalType: "contract IVenusController",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "XVS",
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
        internalType: "contract IVenusVault",
        name: "vault",
        type: "address",
      },
      {
        internalType: "contract IVToken",
        name: "vToken",
        type: "address",
      },
    ],
    name: "borrowAndSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "borrow",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "supply",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IVenusVault",
        name: "vault",
        type: "address",
      },
      {
        internalType: "contract IVToken",
        name: "vToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "borrowInterestPerBlock",
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
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IVenusVault",
        name: "vault",
        type: "address",
      },
      {
        internalType: "contract IVToken",
        name: "vToken",
        type: "address",
      },
    ],
    name: "deleverage",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IVenusController",
        name: "venusController",
        type: "address",
      },
      {
        internalType: "address",
        name: "xvs",
        type: "address",
      },
      {
        internalType: "contract OracleV1",
        name: "oracle",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IVenusVault",
        name: "vault",
        type: "address",
      },
      {
        internalType: "contract IVToken",
        name: "vToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "isProfitable",
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
    inputs: [],
    name: "owner",
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
        internalType: "contract IVToken",
        name: "vToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "predictBorrowRate",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IVToken",
        name: "vToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "predictSupplyRate",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "proxiableUUID",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IVenusVault",
        name: "vault",
        type: "address",
      },
      {
        internalType: "contract IVToken",
        name: "vToken",
        type: "address",
      },
    ],
    name: "safeBorrow",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IVenusVault",
        name: "vault",
        type: "address",
      },
      {
        internalType: "contract IVToken",
        name: "vToken",
        type: "address",
      },
    ],
    name: "safeCollateralRatio",
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
        internalType: "contract IVenusVault",
        name: "vault",
        type: "address",
      },
      {
        internalType: "contract IVToken",
        name: "vToken",
        type: "address",
      },
    ],
    name: "safeRedeem",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IVenusVault",
        name: "vault",
        type: "address",
      },
      {
        internalType: "contract IVToken",
        name: "vToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "borrowAmount",
        type: "uint256",
      },
    ],
    name: "supplyRewardPerBlock",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
    ],
    name: "upgradeTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "upgradeToAndCall",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "version",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
];

const _bytecode =
  "0x60a06040523060805234801561001457600080fd5b506080516125f761004c600039600081816104540152818161049d0152818161077f015281816107bf015261085201526125f76000f3fe60806040526004361061012a5760003560e01c80638da5cb5b116100ab578063e25bd37a1161006f578063e25bd37a1461034d578063e89f2ab41461036d578063e9ac42fe1461038d578063f11b8a65146103ad578063f2fde38b146103cd578063f86a1c52146103ed57600080fd5b80638da5cb5b1461029a5780639d186707146102b8578063a1631ac4146102ed578063c032239a1461030d578063c0c53b8b1461032d57600080fd5b806352d1902d116100f257806352d1902d146101ff57806354fd4d5014610214578063642e7903146102455780636a67ed2014610265578063715018a61461028557600080fd5b8063141e0db81461012f5780633659cfe61461016457806338013f02146101865780634ebfb048146101be5780634f1ef286146101ec575b600080fd5b34801561013b57600080fd5b5061014f61014a366004612114565b61040d565b60405190151581526020015b60405180910390f35b34801561017057600080fd5b5061018461017f366004612155565b610449565b005b34801561019257600080fd5b5060cb546101a6906001600160a01b031681565b6040516001600160a01b03909116815260200161015b565b3480156101ca57600080fd5b506101de6101d9366004612172565b610532565b60405190815260200161015b565b6101846101fa3660046121b4565b610774565b34801561020b57600080fd5b506101de610845565b34801561022057600080fd5b5060408051808201825260028152612b1960f11b6020820152905161015b91906122a4565b34801561025157600080fd5b506101de610260366004612114565b6108f8565b34801561027157600080fd5b5060ca546101a6906001600160a01b031681565b34801561029157600080fd5b50610184610c72565b3480156102a657600080fd5b506033546001600160a01b03166101a6565b3480156102c457600080fd5b506102d86102d3366004612114565b610ca8565b6040805192835260208301919091520161015b565b3480156102f957600080fd5b506101de610308366004612172565b610f8b565b34801561031957600080fd5b506101de6103283660046122d7565b6111ec565b34801561033957600080fd5b50610184610348366004612310565b611334565b34801561035957600080fd5b506102d86103683660046122d7565b611435565b34801561037957600080fd5b506101de6103883660046122d7565b61151f565b34801561039957600080fd5b506101de6103a83660046122d7565b6116f4565b3480156103b957600080fd5b506101de6103c83660046122d7565b6118a3565b3480156103d957600080fd5b506101846103e8366004612155565b611a46565b3480156103f957600080fd5b5060c9546101a6906001600160a01b031681565b600080600061041d868686610ca8565b91509150600061042e8787876108f8565b90508261043b8383612371565b1193505050505b9392505050565b306001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016141561049b5760405162461bcd60e51b815260040161049290612389565b60405180910390fd5b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166104e460008051602061257b833981519152546001600160a01b031690565b6001600160a01b03161461050a5760405162461bcd60e51b8152600401610492906123d5565b61051381611ade565b6040805160008082526020820190925261052f91839190611b08565b50565b600080836001600160a01b0316633b1d21a26040518163ffffffff1660e01b8152600401602060405180830381865afa158015610573573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105979190612421565b9050808311156105a5578092505b6000846001600160a01b031663f3fdb15a6040518163ffffffff1660e01b81526004016020604051808303816000875af11580156105e7573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061060b919061243a565b90506001600160a01b0381166315f240536106268685612457565b86886001600160a01b03166373acee986040518163ffffffff1660e01b81526004016020604051808303816000875af1158015610667573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061068b9190612421565b6106959190612371565b886001600160a01b0316638f840ddd6040518163ffffffff1660e01b81526004016020604051808303816000875af11580156106d5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106f99190612421565b6040516001600160e01b031960e086901b1681526004810193909352602483019190915260448201526064015b6020604051808303816000875af1158015610745573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107699190612421565b925050505b92915050565b306001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614156107bd5760405162461bcd60e51b815260040161049290612389565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031661080660008051602061257b833981519152546001600160a01b031690565b6001600160a01b03161461082c5760405162461bcd60e51b8152600401610492906123d5565b61083582611ade565b61084182826001611b08565b5050565b6000306001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016146108e55760405162461bcd60e51b815260206004820152603860248201527f555550535570677261646561626c653a206d757374206e6f742062652063616c60448201527f6c6564207468726f7567682064656c656761746563616c6c00000000000000006064820152608401610492565b5060008051602061257b83398151915290565b6000806109ca846001600160a01b031663bd6d894d6040518163ffffffff1660e01b81526004016020604051808303816000875af115801561093e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109629190612421565b856001600160a01b03166318160ddd6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156109a0573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109c49190612421565b90611c78565b604051633af9e66960e01b81526001600160a01b038781166004830152919250600091861690633af9e669906024016020604051808303816000875af1158015610a18573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a3c9190612421565b905081610a4e57600092505050610442565b60cb5460c95460ca54604051631abcaa7760e01b81526001600160a01b03898116600483015260009481169363257537c59390821692610ae39288928a92911690631abcaa77906024015b6020604051808303816000875af1158015610ab8573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610adc9190612421565b9190611c89565b6040516001600160e01b031960e085901b1681526001600160a01b0390921660048301526024820152604401602060405180830381865afa158015610b2c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b509190612421565b90506000610b62836109c48989610f8b565b90508160cb60009054906101000a90046001600160a01b03166001600160a01b031663257537c5896001600160a01b0316636f307dc36040518163ffffffff1660e01b81526004016020604051808303816000875af1158015610bc9573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bed919061243a565b6040516001600160e01b031960e084901b1681526001600160a01b03909116600482015260248101859052604401602060405180830381865afa158015610c38573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c5c9190612421565b610c669190612371565b98975050505050505050565b6033546001600160a01b03163314610c9c5760405162461bcd60e51b81526004016104929061246e565b610ca66000611e03565b565b600080600083856001600160a01b03166373acee986040518163ffffffff1660e01b81526004016020604051808303816000875af1158015610cee573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d129190612421565b610d1c9190612371565b6040516305eff7ef60e21b81526001600160a01b0388811660048301529192506000918691908816906317bfdfbc906024016020604051808303816000875af1158015610d6d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d919190612421565b610d9b9190612371565b905081610db057600080935093505050610f83565b60cb5460c95460ca54604051631abcaa7760e01b81526001600160a01b038a8116600483015260009481169363257537c59390821692610dff9288928a92911690631abcaa7790602401610a99565b6040516001600160e01b031960e085901b1681526001600160a01b0390921660048301526024820152604401602060405180830381865afa158015610e48573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e6c9190612421565b90506000610e7e836109c48a8a610532565b9050600060cb60009054906101000a90046001600160a01b03166001600160a01b031663257537c58a6001600160a01b0316636f307dc36040518163ffffffff1660e01b81526004016020604051808303816000875af1158015610ee6573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f0a919061243a565b6040516001600160e01b031960e084901b1681526001600160a01b03909116600482015260248101859052604401602060405180830381865afa158015610f55573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f799190612421565b9650919450505050505b935093915050565b600080836001600160a01b0316633b1d21a26040518163ffffffff1660e01b8152600401602060405180830381865afa158015610fcc573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ff09190612421565b905080831115610ffe578092505b6000846001600160a01b031663f3fdb15a6040518163ffffffff1660e01b81526004016020604051808303816000875af1158015611040573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611064919061243a565b90506001600160a01b03811663b816881661107f8685612457565b86886001600160a01b03166373acee986040518163ffffffff1660e01b81526004016020604051808303816000875af11580156110c0573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110e49190612421565b6110ee9190612371565b886001600160a01b0316638f840ddd6040518163ffffffff1660e01b81526004016020604051808303816000875af115801561112e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111529190612421565b896001600160a01b031663173b99046040518163ffffffff1660e01b81526004016020604051808303816000875af1158015611192573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111b69190612421565b6040516001600160e01b031960e087901b1681526004810194909452602484019290925260448301526064820152608401610726565b60008060006111fb8585611435565b91509150816000141561127d57611274846001600160a01b0316633b1d21a26040518163ffffffff1660e01b8152600401602060405180830381865afa158015611249573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061126d9190612421565b8290611e55565b9250505061076e565b600061129361128c878761151f565b8490611e6b565b905060008183116112a55760006112af565b6112af8284612457565b9050611329670d2f13f7789f00006109c4886001600160a01b0316633b1d21a26040518163ffffffff1660e01b8152600401602060405180830381865afa1580156112fe573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113229190612421565b8490611e55565b979650505050505050565b600054610100900460ff1661134f5760005460ff1615611353565b303b155b6113b65760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b6064820152608401610492565b600054610100900460ff161580156113d8576000805461ffff19166101011790555b6113e0611e80565b60ca80546001600160a01b038087166001600160a01b03199283161790925560c9805486841690831617905560cb805492851692909116919091179055801561142f576000805461ff00191690555b50505050565b6040516305eff7ef60e21b81526001600160a01b03838116600483015260009182918416906317bfdfbc906024016020604051808303816000875af1158015611482573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114a69190612421565b604051633af9e66960e01b81526001600160a01b03868116600483015291935090841690633af9e669906024016020604051808303816000875af11580156114f2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115169190612421565b90509250929050565b60ca54604051638e8f294b60e01b81526001600160a01b0383811660048301526000928392911690638e8f294b90602401606060405180830381865afa15801561156d573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061159191906124b8565b509150506000611603856001600160a01b0316633b9f81de6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156115d8573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115fc9190612421565b8390611c78565b90506000846001600160a01b031663f8f9da286040518163ffffffff1660e01b8152600401602060405180830381865afa158015611645573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116699190612421565b90508061167a5750915061076e9050565b60006116e882876001600160a01b031663ae9d70b06040518163ffffffff1660e01b8152600401602060405180830381865afa1580156116be573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116e29190612421565b90611e6b565b90506113298382611e55565b600080611701848461151f565b90506000806117108686611435565b91509150600081116117545760405162461bcd60e51b815260206004820152600d60248201526c53563a206e6f20737570706c7960981b6044820152606401610492565b60006117608285611c78565b905080831061177657600094505050505061076e565b60006117ed876001600160a01b0316633b1d21a26040518163ffffffff1660e01b8152600401602060405180830381865afa1580156117b9573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906117dd9190612421565b6117e78685612457565b90611e55565b9050806118025760009550505050505061076e565b600080851161181257600061181c565b61181c8286611e6b565b9050600081118015611835575066b1a2bc2ec500008111155b15611849576000965050505050505061076e565b6000806118578b8b86610ca8565b9150915060006118688c8c876108f8565b9050826118758383612371565b11611881576000611893565b61189385670d2f13f7789f0000611c78565b9c9b505050505050505050505050565b6000806118b0848461151f565b90506000806118bf8686611435565b909250905060006118d08285611c78565b90508281106118e657600094505050505061076e565b60ca54604051638e8f294b60e01b81526001600160a01b0388811660048301526000921690638e8f294b90602401606060405180830381865afa158015611931573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061195591906124b8565b509150506000876001600160a01b0316633b1d21a26040518163ffffffff1660e01b8152600401602060405180830381865afa158015611999573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906119bd9190612421565b905060006119dd6119d684670bcbce7f1b150000611c78565b8790611e6b565b905084811115611a2a576000611a056119fe85670d2f13f7789f0000611c78565b8890611e6b565b611a0f9087612457565b9050611a1b8184611e55565b9850505050505050505061076e565b611a38826117e78388612457565b9a9950505050505050505050565b6033546001600160a01b03163314611a705760405162461bcd60e51b81526004016104929061246e565b6001600160a01b038116611ad55760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610492565b61052f81611e03565b6033546001600160a01b0316331461052f5760405162461bcd60e51b81526004016104929061246e565b7f4910fdfa16fed3260ed0e7147f7cc6da11a60208b5b9406d12a635614ffd91435460ff1615611b4057611b3b83611eaf565b505050565b826001600160a01b03166352d1902d6040518163ffffffff1660e01b8152600401602060405180830381865afa925050508015611b9a575060408051601f3d908101601f19168201909252611b9791810190612421565b60015b611bfd5760405162461bcd60e51b815260206004820152602e60248201527f45524331393637557067726164653a206e657720696d706c656d656e7461746960448201526d6f6e206973206e6f74205555505360901b6064820152608401610492565b60008051602061257b8339815191528114611c6c5760405162461bcd60e51b815260206004820152602960248201527f45524331393637557067726164653a20756e737570706f727465642070726f786044820152681a58589b195555525160ba1b6064820152608401610492565b50611b3b838383611f4b565b60006104428383670de0b6b3a76400005b600080806000198587098587029250828110838203039150508060001415611cc35760008411611cb857600080fd5b508290049050610442565b808411611ccf57600080fd5b6000848688098084039381119092039190506000611cef86196001612371565b8616958690049593849004936000819003046001019050611d1081846124f4565b909317926000611d218760036124f4565b6002189050611d3081886124f4565b611d3b906002612457565b611d4590826124f4565b9050611d5181886124f4565b611d5c906002612457565b611d6690826124f4565b9050611d7281886124f4565b611d7d906002612457565b611d8790826124f4565b9050611d9381886124f4565b611d9e906002612457565b611da890826124f4565b9050611db481886124f4565b611dbf906002612457565b611dc990826124f4565b9050611dd581886124f4565b611de0906002612457565b611dea90826124f4565b9050611df681866124f4565b9998505050505050505050565b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6000818310611e645781610442565b5090919050565b600061044283670de0b6b3a764000084611c89565b600054610100900460ff16611ea75760405162461bcd60e51b815260040161049290612513565b610ca6611f70565b6001600160a01b0381163b611f1c5760405162461bcd60e51b815260206004820152602d60248201527f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60448201526c1bdd08184818dbdb9d1c9858dd609a1b6064820152608401610492565b60008051602061257b83398151915280546001600160a01b0319166001600160a01b0392909216919091179055565b611f5483611fa0565b600082511180611f615750805b15611b3b5761142f8383611fe0565b600054610100900460ff16611f975760405162461bcd60e51b815260040161049290612513565b610ca633611e03565b611fa981611eaf565b6040516001600160a01b038216907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a250565b60606001600160a01b0383163b6120485760405162461bcd60e51b815260206004820152602660248201527f416464726573733a2064656c65676174652063616c6c20746f206e6f6e2d636f6044820152651b9d1c9858dd60d21b6064820152608401610492565b600080846001600160a01b031684604051612063919061255e565b600060405180830381855af49150503d806000811461209e576040519150601f19603f3d011682016040523d82523d6000602084013e6120a3565b606091505b5091509150610769828260405180606001604052806027815260200161259b60279139606083156120d5575081610442565b8251156120e55782518084602001fd5b8160405162461bcd60e51b815260040161049291906122a4565b6001600160a01b038116811461052f57600080fd5b60008060006060848603121561212957600080fd5b8335612134816120ff565b92506020840135612144816120ff565b929592945050506040919091013590565b60006020828403121561216757600080fd5b8135610442816120ff565b6000806040838503121561218557600080fd5b8235612190816120ff565b946020939093013593505050565b634e487b7160e01b600052604160045260246000fd5b600080604083850312156121c757600080fd5b82356121d2816120ff565b9150602083013567ffffffffffffffff808211156121ef57600080fd5b818501915085601f83011261220357600080fd5b8135818111156122155761221561219e565b604051601f8201601f19908116603f0116810190838211818310171561223d5761223d61219e565b8160405282815288602084870101111561225657600080fd5b8260208601602083013760006020848301015280955050505050509250929050565b60005b8381101561229357818101518382015260200161227b565b8381111561142f5750506000910152565b60208152600082518060208401526122c3816040850160208701612278565b601f01601f19169190910160400192915050565b600080604083850312156122ea57600080fd5b82356122f5816120ff565b91506020830135612305816120ff565b809150509250929050565b60008060006060848603121561232557600080fd5b8335612330816120ff565b92506020840135612340816120ff565b91506040840135612350816120ff565b809150509250925092565b634e487b7160e01b600052601160045260246000fd5b600082198211156123845761238461235b565b500190565b6020808252602c908201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060408201526b19195b1959d85d1958d85b1b60a21b606082015260800190565b6020808252602c908201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060408201526b6163746976652070726f787960a01b606082015260800190565b60006020828403121561243357600080fd5b5051919050565b60006020828403121561244c57600080fd5b8151610442816120ff565b6000828210156124695761246961235b565b500390565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b805180151581146124b357600080fd5b919050565b6000806000606084860312156124cd57600080fd5b6124d6846124a3565b9250602084015191506124eb604085016124a3565b90509250925092565b600081600019048311821515161561250e5761250e61235b565b500290565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b60008251612570818460208701612278565b919091019291505056fe360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a264697066735822122091df359dd51b9d699a2d60b0d221a93c5780bebfc68c7f8727b5b87b679c24eb64736f6c634300080a0033";

type TestSafeVenusV2ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TestSafeVenusV2ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TestSafeVenusV2__factory extends ContractFactory {
  constructor(...args: TestSafeVenusV2ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "TestSafeVenusV2";
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<TestSafeVenusV2> {
    return super.deploy(overrides || {}) as Promise<TestSafeVenusV2>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): TestSafeVenusV2 {
    return super.attach(address) as TestSafeVenusV2;
  }
  connect(signer: Signer): TestSafeVenusV2__factory {
    return super.connect(signer) as TestSafeVenusV2__factory;
  }
  static readonly contractName: "TestSafeVenusV2";
  public readonly contractName: "TestSafeVenusV2";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TestSafeVenusV2Interface {
    return new utils.Interface(_abi) as TestSafeVenusV2Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TestSafeVenusV2 {
    return new Contract(address, _abi, signerOrProvider) as TestSafeVenusV2;
  }
}
