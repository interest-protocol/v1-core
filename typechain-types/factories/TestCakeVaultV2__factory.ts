/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  TestCakeVaultV2,
  TestCakeVaultV2Interface,
} from "../TestCakeVaultV2";

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
        indexed: false,
        internalType: "uint256",
        name: "rewards",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "fee",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "blockNumber",
        type: "uint256",
      },
    ],
    name: "Compound",
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
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Deposit",
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
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Withdraw",
    type: "event",
  },
  {
    inputs: [],
    name: "CAKE",
    outputs: [
      {
        internalType: "contract IERC20Upgradeable",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "CAKE_MASTER_CHEF",
    outputs: [
      {
        internalType: "contract IMasterChef",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MARKET",
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
    inputs: [],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "compound",
    outputs: [],
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
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getPendingRewards",
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
        name: "account",
        type: "address",
      },
    ],
    name: "getUserPendingRewards",
    outputs: [
      {
        internalType: "uint256",
        name: "rewards",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IMasterChef",
        name: "cakeMasterChef",
        type: "address",
      },
      {
        internalType: "contract IERC20Upgradeable",
        name: "cake",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
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
        internalType: "address",
        name: "market",
        type: "address",
      },
    ],
    name: "setMarket",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "totalAmount",
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
    name: "totalRewardsPerAmount",
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
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "userInfo",
    outputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "rewardDebt",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "rewards",
        type: "uint256",
      },
    ],
    stateMutability: "view",
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
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60a06040523060805234801561001457600080fd5b5060805161231661004c60003960008181610493015281816104dc0152818161067a015281816106ba015261074d01526123166000f3fe60806040526004361061012a5760003560e01c80636dcea85f116100ab578063cf7c11fa1161006f578063cf7c11fa14610340578063d9621f9e14610360578063d9caed1214610375578063f2fde38b14610395578063f46f16c2146103b5578063f69e2046146103d557600080fd5b80636dcea85f146102b7578063715018a6146102d75780638340f549146102ec5780638c3061bf1461030c5780638da5cb5b1461032257600080fd5b8063485cc955116100f2578063485cc9551461021e5780634ca6ef281461023e5780634f1ef2861461025e57806352d1902d1461027157806354fd4d501461028657600080fd5b806312424e3f1461012f5780631959a002146101465780631a39d8ef146101a2578063286bf1e2146101c65780633659cfe6146101fe575b600080fd5b34801561013b57600080fd5b506101446103ea565b005b34801561015257600080fd5b50610182610161366004611ec6565b60cc6020526000908152604090208054600182015460029092015490919083565b604080519384526020840192909252908201526060015b60405180910390f35b3480156101ae57600080fd5b506101b860cd5481565b604051908152602001610199565b3480156101d257600080fd5b5060c9546101e6906001600160a01b031681565b6040516001600160a01b039091168152602001610199565b34801561020a57600080fd5b50610144610219366004611ec6565b610488565b34801561022a57600080fd5b50610144610239366004611ee3565b610571565b34801561024a57600080fd5b5060ca546101e6906001600160a01b031681565b61014461026c366004611f32565b61066f565b34801561027d57600080fd5b506101b8610740565b34801561029257600080fd5b5060408051808201825260028152612b1960f11b602082015290516101999190612022565b3480156102c357600080fd5b506101446102d2366004611ec6565b6107f3565b3480156102e357600080fd5b50610144610891565b3480156102f857600080fd5b50610144610307366004612055565b6108c5565b34801561031857600080fd5b506101b860ce5481565b34801561032e57600080fd5b506033546001600160a01b03166101e6565b34801561034c57600080fd5b506101b861035b366004611ec6565b6109a3565b34801561036c57600080fd5b506101b8610a57565b34801561038157600080fd5b50610144610390366004612055565b610ad1565b3480156103a157600080fd5b506101446103b0366004611ec6565b610bf4565b3480156103c157600080fd5b5060cb546101e6906001600160a01b031681565b3480156103e157600080fd5b50610144610c8c565b60c95460ca54604051636eb1769f60e11b81523060048201526001600160a01b0392831660248201819052610486939092169063dd62ed3e90604401602060405180830381865afa158015610443573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104679190612096565b610473906000196120c5565b60ca546001600160a01b03169190610da8565b565b306001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614156104da5760405162461bcd60e51b81526004016104d1906120dc565b60405180910390fd5b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031661052360008051602061229a833981519152546001600160a01b031690565b6001600160a01b0316146105495760405162461bcd60e51b81526004016104d190612128565b61055281610e93565b6040805160008082526020820190925261056e91839190610ebd565b50565b600054610100900460ff1661058c5760005460ff1615610590565b303b155b6105f35760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084016104d1565b600054610100900460ff16158015610615576000805461ffff19166101011790555b61061d611028565b60c980546001600160a01b038086166001600160a01b03199283161790925560ca805492851692909116821790556106589084600019611057565b801561066a576000805461ff00191690555b505050565b306001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614156106b85760405162461bcd60e51b81526004016104d1906120dc565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031661070160008051602061229a833981519152546001600160a01b031690565b6001600160a01b0316146107275760405162461bcd60e51b81526004016104d190612128565b61073082610e93565b61073c82826001610ebd565b5050565b6000306001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016146107e05760405162461bcd60e51b815260206004820152603860248201527f555550535570677261646561626c653a206d757374206e6f742062652063616c60448201527f6c6564207468726f7567682064656c656761746563616c6c000000000000000060648201526084016104d1565b5060008051602061229a83398151915290565b6107fb61116c565b6001600160a01b0381166108215760405162461bcd60e51b81526004016104d190612174565b60cb546001600160a01b03161561086f5760405162461bcd60e51b815260206004820152601260248201527115985d5b1d0e88185b1c9958591e481cd95d60721b60448201526064016104d1565b60cb80546001600160a01b0319166001600160a01b0392909216919091179055565b6033546001600160a01b031633146108bb5760405162461bcd60e51b81526004016104d1906121a4565b6104866000611196565b60cb546001600160a01b031633146109145760405162461bcd60e51b815260206004820152601260248201527115985d5b1d0e881bdb9b1e481b585c9ad95d60721b60448201526064016104d1565b6000811161095c5760405162461bcd60e51b815260206004820152601560248201527415985d5b1d0e881b9bc81e995c9bc8185b5bdd5b9d605a1b60448201526064016104d1565b6001600160a01b0383161580159061097c57506001600160a01b03821615155b6109985760405162461bcd60e51b81526004016104d190612174565b61066a8383836111e8565b60cd54600090806109b75750600092915050565b60ce546001600160a01b038416600090815260cc60209081526040808320815160608101835281548152600182015493810193909352600201549082015290610a0884610a02610a57565b906113b3565b6020830151835191925090610a2790610a2184876121d9565b906113cf565b610a3191906120c5565b610a3b90866121d9565b9450816040015185610a4d91906121d9565b9695505050505050565b60c954604051631175a1dd60e01b8152600060048201819052306024830152916001600160a01b031690631175a1dd906044015b602060405180830381865afa158015610aa8573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610acc9190612096565b905090565b60cb546001600160a01b03163314610b205760405162461bcd60e51b815260206004820152601260248201527115985d5b1d0e881bdb9b1e481b585c9ad95d60721b60448201526064016104d1565b60008111610b685760405162461bcd60e51b815260206004820152601560248201527415985d5b1d0e881b9bc81e995c9bc8185b5bdd5b9d605a1b60448201526064016104d1565b6001600160a01b03831615801590610b8857506001600160a01b03821615155b610ba45760405162461bcd60e51b81526004016104d190612174565b600060cd5411610be95760405162461bcd60e51b815260206004820152601060248201526f5661756c743a206e6f20746f6b656e7360801b60448201526064016104d1565b61066a8383836113e4565b6033546001600160a01b03163314610c1e5760405162461bcd60e51b81526004016104d1906121a4565b6001600160a01b038116610c835760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016104d1565b61056e81611196565b60ce5460cd5460009190610c9f8361172a565b610ca990846121d9565b92506000610cbe8466470de4df8200006113cf565b9050610cce82610a0283876120c5565b610cd890846121d9565b9250610cf13360ca546001600160a01b031690836117b2565b60c9546001600160a01b03166341441d3b610d0a6117e2565b6040518263ffffffff1660e01b8152600401610d2891815260200190565b600060405180830381600087803b158015610d4257600080fd5b505af1158015610d56573d6000803e3d6000fd5b50505060ce84905550437f27aaed1e2ace6cfa5a07a3dc6557aed2566349b8a63e8bc208943164c6bb615f610d8b83876120c5565b60408051918252602082018590520160405180910390a250505050565b604051636eb1769f60e11b81523060048201526001600160a01b038381166024830152600091839186169063dd62ed3e90604401602060405180830381865afa158015610df9573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e1d9190612096565b610e2791906121d9565b6040516001600160a01b038516602482015260448101829052909150610e8d90859063095ea7b360e01b906064015b60408051601f198184030181529190526020810180516001600160e01b03166001600160e01b031990931692909217909152611813565b50505050565b6033546001600160a01b0316331461056e5760405162461bcd60e51b81526004016104d1906121a4565b7f4910fdfa16fed3260ed0e7147f7cc6da11a60208b5b9406d12a635614ffd91435460ff1615610ef05761066a836118e5565b826001600160a01b03166352d1902d6040518163ffffffff1660e01b8152600401602060405180830381865afa925050508015610f4a575060408051601f3d908101601f19168201909252610f4791810190612096565b60015b610fad5760405162461bcd60e51b815260206004820152602e60248201527f45524331393637557067726164653a206e657720696d706c656d656e7461746960448201526d6f6e206973206e6f74205555505360901b60648201526084016104d1565b60008051602061229a833981519152811461101c5760405162461bcd60e51b815260206004820152602960248201527f45524331393637557067726164653a20756e737570706f727465642070726f786044820152681a58589b195555525160ba1b60648201526084016104d1565b5061066a838383611981565b600054610100900460ff1661104f5760405162461bcd60e51b81526004016104d1906121f1565b6104866119a6565b8015806110d15750604051636eb1769f60e11b81523060048201526001600160a01b03838116602483015284169063dd62ed3e90604401602060405180830381865afa1580156110ab573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110cf9190612096565b155b61113c5760405162461bcd60e51b815260206004820152603660248201527f5361666545524332303a20617070726f76652066726f6d206e6f6e2d7a65726f60448201527520746f206e6f6e2d7a65726f20616c6c6f77616e636560501b60648201526084016104d1565b6040516001600160a01b03831660248201526044810182905261066a90849063095ea7b360e01b90606401610e56565b6033546001600160a01b031633146104865760405162461bcd60e51b81526004016104d1906121a4565b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6001600160a01b038216600090815260cc6020908152604091829020825160608101845281548152600182015492810192909252600201549181019190915260cd5460ce54811561124c5761123f82610a026119d6565b61124990826121d9565b90505b82511561128457602083015183516112659083906113cf565b61126f91906120c5565b8360400181815161128091906121d9565b9052505b61128e84836121d9565b915083836000018181516112a291906121d9565b90525060ca546112bd906001600160a01b0316873087611a4a565b60c9546001600160a01b03166341441d3b6112d66117e2565b6040518263ffffffff1660e01b81526004016112f491815260200190565b600060405180830381600087803b15801561130e57600080fd5b505af1158015611322573d6000803e3d6000fd5b5050845161133392508391506113cf565b60208481019182526001600160a01b03878116600081815260cc845260409081902088518155945160018601558088015160029095019490945560cd86905560ce8590559251878152908916917f5548c837ab068cf56a2c2479df0882a4922fd203edb7517321831d95078c5f62910160405180910390a3505050505050565b60006113c883670de0b6b3a764000084611a82565b9392505050565b60006113c88383670de0b6b3a7640000611a82565b6001600160a01b038316600090815260cc602090815260409182902082516060810184528154808252600183015493820193909352600290910154928101929092528211156114755760405162461bcd60e51b815260206004820152601860248201527f5661756c743a206e6f7420656e6f75676820746f6b656e73000000000000000060448201526064016104d1565b60cd5460ce5461148882610a028661172a565b61149290826121d9565b602084015184519192506000916114aa9084906113cf565b6114b491906120c5565b90506114c085846120c5565b925084846000018181516114d491906120c5565b90525060408401516114e690826121d9565b6000604086018190529091506114fa6117e2565b9050600061150883886121d9565b90508181111561157e5760c9546001600160a01b0316631058d28161152d84846120c5565b6040518263ffffffff1660e01b815260040161154b91815260200190565b600060405180830381600087803b15801561156557600080fd5b505af1158015611579573d6000803e3d6000fd5b505050505b886001600160a01b0316886001600160a01b031614156115be576115b9886115a689866121d9565b60ca546001600160a01b031691906117b2565b6115ec565b60ca546115d5906001600160a01b031689896117b2565b60ca546115ec906001600160a01b03168a856117b2565b60008511801561160b5750670de0b6b3a76400006116086117e2565b10155b1561167a5760c9546001600160a01b03166341441d3b6116296117e2565b6040518263ffffffff1660e01b815260040161164791815260200190565b600060405180830381600087803b15801561166157600080fd5b505af1158015611675573d6000803e3d6000fd5b505050505b84156116a15760ce84905585516116929085906113cf565b602087015260cd8590556116b7565b600060cd81905560ce8190556020870181905286525b6001600160a01b03898116600081815260cc60209081526040918290208a5181558a82015160018201558a83015160029091015590518a8152928b16927f9b1bfa7fa9ee420a16e124f794c35ac9f90472acc99140eb2f6447c714cad8eb910160405180910390a3505050505050505050565b6000806117356117e2565b60c954604051631058d28160e01b8152600481018690529192506001600160a01b031690631058d28190602401600060405180830381600087803b15801561177c57600080fd5b505af1158015611790573d6000803e3d6000fd5b50505050828161179e6117e2565b6117a891906120c5565b6113c891906120c5565b6040516001600160a01b03831660248201526044810182905261066a90849063a9059cbb60e01b90606401610e56565b60ca546040516370a0823160e01b81523060048201526000916001600160a01b0316906370a0823190602401610a8b565b6000611868826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b0316611bfc9092919063ffffffff16565b80519091501561066a5780806020019051810190611886919061223c565b61066a5760405162461bcd60e51b815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e6044820152691bdd081cdd58d8d9595960b21b60648201526084016104d1565b6001600160a01b0381163b6119525760405162461bcd60e51b815260206004820152602d60248201527f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60448201526c1bdd08184818dbdb9d1c9858dd609a1b60648201526084016104d1565b60008051602061229a83398151915280546001600160a01b0319166001600160a01b0392909216919091179055565b61198a83611c13565b6000825111806119975750805b1561066a57610e8d8383611c53565b600054610100900460ff166119cd5760405162461bcd60e51b81526004016104d1906121f1565b61048633611196565b60c9546000906001600160a01b03166341441d3b6119f26117e2565b6040518263ffffffff1660e01b8152600401611a1091815260200190565b600060405180830381600087803b158015611a2a57600080fd5b505af1158015611a3e573d6000803e3d6000fd5b50505050610acc6117e2565b6040516001600160a01b0380851660248301528316604482015260648101829052610e8d9085906323b872dd60e01b90608401610e56565b600080806000198587098587029250828110838203039150508060001415611abc5760008411611ab157600080fd5b5082900490506113c8565b808411611ac857600080fd5b6000848688098084039381119092039190506000611ae8861960016121d9565b8616958690049593849004936000819003046001019050611b09818461225e565b909317926000611b1a87600361225e565b6002189050611b29818861225e565b611b349060026120c5565b611b3e908261225e565b9050611b4a818861225e565b611b559060026120c5565b611b5f908261225e565b9050611b6b818861225e565b611b769060026120c5565b611b80908261225e565b9050611b8c818861225e565b611b979060026120c5565b611ba1908261225e565b9050611bad818861225e565b611bb89060026120c5565b611bc2908261225e565b9050611bce818861225e565b611bd99060026120c5565b611be3908261225e565b9050611bef818661225e565b9998505050505050505050565b6060611c0b8484600085611d47565b949350505050565b611c1c816118e5565b6040516001600160a01b038216907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a250565b60606001600160a01b0383163b611cbb5760405162461bcd60e51b815260206004820152602660248201527f416464726573733a2064656c65676174652063616c6c20746f206e6f6e2d636f6044820152651b9d1c9858dd60d21b60648201526084016104d1565b600080846001600160a01b031684604051611cd6919061227d565b600060405180830381855af49150503d8060008114611d11576040519150601f19603f3d011682016040523d82523d6000602084013e611d16565b606091505b5091509150611d3e82826040518060600160405280602781526020016122ba60279139611e78565b95945050505050565b606082471015611da85760405162461bcd60e51b815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f6044820152651c8818d85b1b60d21b60648201526084016104d1565b6001600160a01b0385163b611dff5760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e747261637400000060448201526064016104d1565b600080866001600160a01b03168587604051611e1b919061227d565b60006040518083038185875af1925050503d8060008114611e58576040519150601f19603f3d011682016040523d82523d6000602084013e611e5d565b606091505b5091509150611e6d828286611e78565b979650505050505050565b60608315611e875750816113c8565b825115611e975782518084602001fd5b8160405162461bcd60e51b81526004016104d19190612022565b6001600160a01b038116811461056e57600080fd5b600060208284031215611ed857600080fd5b81356113c881611eb1565b60008060408385031215611ef657600080fd5b8235611f0181611eb1565b91506020830135611f1181611eb1565b809150509250929050565b634e487b7160e01b600052604160045260246000fd5b60008060408385031215611f4557600080fd5b8235611f5081611eb1565b9150602083013567ffffffffffffffff80821115611f6d57600080fd5b818501915085601f830112611f8157600080fd5b813581811115611f9357611f93611f1c565b604051601f8201601f19908116603f01168101908382118183101715611fbb57611fbb611f1c565b81604052828152886020848701011115611fd457600080fd5b8260208601602083013760006020848301015280955050505050509250929050565b60005b83811015612011578181015183820152602001611ff9565b83811115610e8d5750506000910152565b6020815260008251806020840152612041816040850160208701611ff6565b601f01601f19169190910160400192915050565b60008060006060848603121561206a57600080fd5b833561207581611eb1565b9250602084013561208581611eb1565b929592945050506040919091013590565b6000602082840312156120a857600080fd5b5051919050565b634e487b7160e01b600052601160045260246000fd5b6000828210156120d7576120d76120af565b500390565b6020808252602c908201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060408201526b19195b1959d85d1958d85b1b60a21b606082015260800190565b6020808252602c908201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060408201526b6163746976652070726f787960a01b606082015260800190565b6020808252601690820152755661756c743a206e6f207a65726f206164647265737360501b604082015260600190565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b600082198211156121ec576121ec6120af565b500190565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b60006020828403121561224e57600080fd5b815180151581146113c857600080fd5b6000816000190483118215151615612278576122786120af565b500290565b6000825161228f818460208701611ff6565b919091019291505056fe360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a26469706673582212204fff285ae6d5ceb3960380209e4cffa05a3e698b924204f7c4c9174b26a2e0de64736f6c634300080a0033";

type TestCakeVaultV2ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TestCakeVaultV2ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TestCakeVaultV2__factory extends ContractFactory {
  constructor(...args: TestCakeVaultV2ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "TestCakeVaultV2";
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<TestCakeVaultV2> {
    return super.deploy(overrides || {}) as Promise<TestCakeVaultV2>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): TestCakeVaultV2 {
    return super.attach(address) as TestCakeVaultV2;
  }
  connect(signer: Signer): TestCakeVaultV2__factory {
    return super.connect(signer) as TestCakeVaultV2__factory;
  }
  static readonly contractName: "TestCakeVaultV2";
  public readonly contractName: "TestCakeVaultV2";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TestCakeVaultV2Interface {
    return new utils.Interface(_abi) as TestCakeVaultV2Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TestCakeVaultV2 {
    return new Contract(address, _abi, signerOrProvider) as TestCakeVaultV2;
  }
}
