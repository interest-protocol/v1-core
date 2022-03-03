/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  TestPancakeOracleV2,
  TestPancakeOracleV2Interface,
} from "../TestPancakeOracleV2";

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
        name: "pair",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price0Cumulative",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price1Cumulative",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "Update",
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
    name: "FACTORY",
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
    name: "GRANULARITY",
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
    name: "LIBRARY_WRAPPER",
    outputs: [
      {
        internalType: "contract LibraryWrapper",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "PERIOD_SIZE",
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
    name: "WINDOW_SIZE",
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
        name: "tokenIn",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amountIn",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "tokenOut",
        type: "address",
      },
    ],
    name: "consult",
    outputs: [
      {
        internalType: "uint256",
        name: "amountOut",
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
        name: "factory",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "windowSize",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "granularity",
        type: "uint8",
      },
      {
        internalType: "contract LibraryWrapper",
        name: "libraryWrapper",
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
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "observationIndexOf",
    outputs: [
      {
        internalType: "uint8",
        name: "index",
        type: "uint8",
      },
    ],
    stateMutability: "view",
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
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "pairObservations",
    outputs: [
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "price0Cumulative",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "price1Cumulative",
        type: "uint256",
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
        name: "tokenA",
        type: "address",
      },
      {
        internalType: "address",
        name: "tokenB",
        type: "address",
      },
    ],
    name: "update",
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
  "0x60a06040523060805234801561001457600080fd5b50608051611a7061004c6000396000818161035a015281816103a3015281816104430152818161048301526105160152611a706000f3fe6080604052600436106100fe5760003560e01c80638ac684fe11610095578063bfcc8e4211610064578063bfcc8e421461029e578063c640752d146102d9578063dbaad32f146102f9578063f2fde38b14610319578063fc9654ab1461033957600080fd5b80638ac684fe146102145780638c86f1e4146102405780638da5cb5b14610260578063a04a06a11461027e57600080fd5b806352d1902d116100d157806352d1902d1461019957806354fd4d50146101ae578063715018a6146101df57806389a52590146101f457600080fd5b80632dd31000146101035780633659cfe6146101405780634f1ef28614610162578063509ef27c14610175575b600080fd5b34801561010f57600080fd5b5060c954610123906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b34801561014c57600080fd5b5061016061015b36600461149c565b61034f565b005b6101606101703660046114cf565b610438565b34801561018157600080fd5b5061018b60cb5481565b604051908152602001610137565b3480156101a557600080fd5b5061018b610509565b3480156101ba57600080fd5b5060408051808201825260028152612b1960f11b6020820152905161013791906115bf565b3480156101eb57600080fd5b506101606105bc565b34801561020057600080fd5b5060ca54610123906001600160a01b031681565b34801561022057600080fd5b5060cc5461022e9060ff1681565b60405160ff9091168152602001610137565b34801561024c57600080fd5b5061018b61025b3660046115f2565b6105f2565b34801561026c57600080fd5b506033546001600160a01b0316610123565b34801561028a57600080fd5b50610160610299366004611634565b610854565b3480156102aa57600080fd5b506102be6102b936600461168d565b6109d3565b60408051938452602084019290925290820152606001610137565b3480156102e557600080fd5b506101606102f43660046116b9565b610a15565b34801561030557600080fd5b5061022e6103143660046116f2565b610d8f565b34801561032557600080fd5b5061016061033436600461149c565b610db6565b34801561034557600080fd5b5061018b60cd5481565b306001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614156103a15760405162461bcd60e51b81526004016103989061170b565b60405180910390fd5b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166103ea6000805160206119f4833981519152546001600160a01b031690565b6001600160a01b0316146104105760405162461bcd60e51b815260040161039890611757565b61041981610e4e565b6040805160008082526020820190925261043591839190610e78565b50565b306001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614156104815760405162461bcd60e51b81526004016103989061170b565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166104ca6000805160206119f4833981519152546001600160a01b031690565b6001600160a01b0316146104f05760405162461bcd60e51b815260040161039890611757565b6104f982610e4e565b61050582826001610e78565b5050565b6000306001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016146105a95760405162461bcd60e51b815260206004820152603860248201527f555550535570677261646561626c653a206d757374206e6f742062652063616c60448201527f6c6564207468726f7567682064656c656761746563616c6c00000000000000006064820152608401610398565b506000805160206119f483398151915290565b6033546001600160a01b031633146105e65760405162461bcd60e51b8152600401610398906117a3565b6105f06000610fe8565b565b60cb5460ca5460c9546040516336c8e07160e11b81526001600160a01b0391821660048201528682166024820152848216604482015260009392919091169083908290636d91c0e290606401602060405180830381865afa15801561065b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061067f91906117d8565b9050600061068c8261103a565b805190915060009061069e904261180b565b9050808510156106f05760405162461bcd60e51b815260206004820152601760248201527f504f3a206d697373696e67206f62736572766174696f6e0000000000000000006044820152606401610398565b60cd546106fe906002611822565b610708908661180b565b81101561071757610717611841565b604051633f14dccd60e01b81526001600160a01b0384811660048301526000918291871690633f14dccd90602401606060405180830381865afa158015610762573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107869190611857565b50604051632a26552b60e11b81526001600160a01b038e811660048301528c8116602483015292945090925060009188169063544caa56906044016040805180830381865afa1580156107dd573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610801919061188e565b5090508b6001600160a01b0316816001600160a01b0316146108325761082d856040015183868e6110f2565b610842565b610842856020015184868e6110f2565b985050505050505050505b9392505050565b600054610100900460ff1661086f5760005460ff1615610873565b303b155b6108d65760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b6064820152608401610398565b600054610100900460ff161580156108f8576000805461ffff19166101011790555b60018360ff16116109415760405162461bcd60e51b8152602060048201526013602482015272504f3a206772616e756c6172697479203e203160681b6044820152606401610398565b8360ff841661095081836118d3565b60cd81905561095f9190611822565b1461096c5761096c611841565b610974611156565b60c980546001600160a01b038088166001600160a01b03199283161790925560cb86905560cc805460ff871660ff1990911617905560ca80549285169290911691909117905580156109cc576000805461ff00191690555b5050505050565b60ce60205281600052604060002081815481106109ef57600080fd5b600091825260209091206003909102018054600182015460029092015490935090915083565b60c95460cc5460ca546040516336c8e07160e11b81526001600160a01b0393841660048201819052868516602483015285851660448301529360ff90931692909116906000908290636d91c0e290606401602060405180830381865afa158015610a83573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610aa791906117d8565b60405163e6a4390560e01b81526001600160a01b038881166004830152878116602483015291925060009186169063e6a4390590604401602060405180830381865afa158015610afb573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b1f91906117d8565b6001600160a01b03161415610b765760405162461bcd60e51b815260206004820152601760248201527f504f3a207061697220646f6573206e6f742065786973740000000000000000006044820152606401610398565b6001600160a01b038116600090815260ce60205260409020545b83811015610bcb576001600160a01b038216600090815260ce6020526040812080546001018155905280610bc3816118e7565b915050610b90565b506000610bd742610d8f565b6001600160a01b038316600090815260ce602052604081208054929350909160ff8416908110610c0957610c09611902565b6000918252602080832060408051606081018252600390940290910180548085526001820154938501939093526002015490830152909250610c4b904261180b565b905060cd54811115610d8457604051633f14dccd60e01b81526001600160a01b0385811660048301526000918291881690633f14dccd90602401606060405180830381865afa158015610ca2573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cc69190611857565b50428652602080870183905260408088018390526001600160a01b038a16600090815260ce90925290208054929450909250859160ff8816908110610d0d57610d0d611902565b60009182526020918290208351600392909202019081558282015160018201556040928301516002909101558151848152908101839052428183015290516001600160a01b038816917f96ca5813fd6a7ce6930a4f31eb077b2cb8e92e497a52cc5d763773e80b6ec703919081900360600190a250505b505050505050505050565b60cc5460cd5460009160ff1690610da690846118d3565b610db09190611918565b92915050565b6033546001600160a01b03163314610de05760405162461bcd60e51b8152600401610398906117a3565b6001600160a01b038116610e455760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610398565b61043581610fe8565b6033546001600160a01b031633146104355760405162461bcd60e51b8152600401610398906117a3565b7f4910fdfa16fed3260ed0e7147f7cc6da11a60208b5b9406d12a635614ffd91435460ff1615610eb057610eab83611185565b505050565b826001600160a01b03166352d1902d6040518163ffffffff1660e01b8152600401602060405180830381865afa925050508015610f0a575060408051601f3d908101601f19168201909252610f079181019061192c565b60015b610f6d5760405162461bcd60e51b815260206004820152602e60248201527f45524331393637557067726164653a206e657720696d706c656d656e7461746960448201526d6f6e206973206e6f74205555505360901b6064820152608401610398565b6000805160206119f48339815191528114610fdc5760405162461bcd60e51b815260206004820152602960248201527f45524331393637557067726164653a20756e737570706f727465642070726f786044820152681a58589b195555525160ba1b6064820152608401610398565b50610eab838383611221565b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b61105e60405180606001604052806000815260200160008152602001600081525090565b600061106942610d8f565b6001600160a01b038416600090815260ce6020526040902060cc549192509060ff16611096836001611945565b6110a0919061196a565b60ff16815481106110b3576110b3611902565b90600052602060002090600302016040518060600160405290816000820154815260200160018201548152602001600282015481525050915050919050565b600080604051806020016040528085888861110d919061180b565b61111791906118d3565b6001600160e01b031690529050611138611131828561124c565b5160701c90565b71ffffffffffffffffffffffffffffffffffff169695505050505050565b600054610100900460ff1661117d5760405162461bcd60e51b81526004016103989061198c565b6105f06112ea565b6001600160a01b0381163b6111f25760405162461bcd60e51b815260206004820152602d60248201527f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60448201526c1bdd08184818dbdb9d1c9858dd609a1b6064820152608401610398565b6000805160206119f483398151915280546001600160a01b0319166001600160a01b0392909216919091179055565b61122a8361131a565b6000825111806112375750805b15610eab57611246838361135a565b50505050565b6040805160208101909152600081526000821580611289575083516001600160e01b03168361127b8183611822565b925061128790836118d3565b145b6112d55760405162461bcd60e51b815260206004820152601960248201527f4669786564506f696e743a3a6d756c3a206f766572666c6f77000000000000006044820152606401610398565b60408051602081019091529081529392505050565b600054610100900460ff166113115760405162461bcd60e51b81526004016103989061198c565b6105f033610fe8565b61132381611185565b6040516001600160a01b038216907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a250565b60606001600160a01b0383163b6113c25760405162461bcd60e51b815260206004820152602660248201527f416464726573733a2064656c65676174652063616c6c20746f206e6f6e2d636f6044820152651b9d1c9858dd60d21b6064820152608401610398565b600080846001600160a01b0316846040516113dd91906119d7565b600060405180830381855af49150503d8060008114611418576040519150601f19603f3d011682016040523d82523d6000602084013e61141d565b606091505b50915091506114458282604051806060016040528060278152602001611a146027913961144e565b95945050505050565b6060831561145d57508161084d565b82511561146d5782518084602001fd5b8160405162461bcd60e51b815260040161039891906115bf565b6001600160a01b038116811461043557600080fd5b6000602082840312156114ae57600080fd5b813561084d81611487565b634e487b7160e01b600052604160045260246000fd5b600080604083850312156114e257600080fd5b82356114ed81611487565b9150602083013567ffffffffffffffff8082111561150a57600080fd5b818501915085601f83011261151e57600080fd5b813581811115611530576115306114b9565b604051601f8201601f19908116603f01168101908382118183101715611558576115586114b9565b8160405282815288602084870101111561157157600080fd5b8260208601602083013760006020848301015280955050505050509250929050565b60005b838110156115ae578181015183820152602001611596565b838111156112465750506000910152565b60208152600082518060208401526115de816040850160208701611593565b601f01601f19169190910160400192915050565b60008060006060848603121561160757600080fd5b833561161281611487565b925060208401359150604084013561162981611487565b809150509250925092565b6000806000806080858703121561164a57600080fd5b843561165581611487565b935060208501359250604085013560ff8116811461167257600080fd5b9150606085013561168281611487565b939692955090935050565b600080604083850312156116a057600080fd5b82356116ab81611487565b946020939093013593505050565b600080604083850312156116cc57600080fd5b82356116d781611487565b915060208301356116e781611487565b809150509250929050565b60006020828403121561170457600080fd5b5035919050565b6020808252602c908201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060408201526b19195b1959d85d1958d85b1b60a21b606082015260800190565b6020808252602c908201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060408201526b6163746976652070726f787960a01b606082015260800190565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b6000602082840312156117ea57600080fd5b815161084d81611487565b634e487b7160e01b600052601160045260246000fd5b60008282101561181d5761181d6117f5565b500390565b600081600019048311821515161561183c5761183c6117f5565b500290565b634e487b7160e01b600052600160045260246000fd5b60008060006060848603121561186c57600080fd5b8351925060208401519150604084015163ffffffff8116811461162957600080fd5b600080604083850312156118a157600080fd5b82516118ac81611487565b60208401519092506116e781611487565b634e487b7160e01b600052601260045260246000fd5b6000826118e2576118e26118bd565b500490565b60006000198214156118fb576118fb6117f5565b5060010190565b634e487b7160e01b600052603260045260246000fd5b600082611927576119276118bd565b500690565b60006020828403121561193e57600080fd5b5051919050565b600060ff821660ff84168060ff03821115611962576119626117f5565b019392505050565b600060ff83168061197d5761197d6118bd565b8060ff84160691505092915050565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b600082516119e9818460208701611593565b919091019291505056fe360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a2646970667358221220110db95f29d593345503b4d38bf998f5f736ce1934323dbe7a8e9752ae1697a164736f6c634300080a0033";

type TestPancakeOracleV2ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TestPancakeOracleV2ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TestPancakeOracleV2__factory extends ContractFactory {
  constructor(...args: TestPancakeOracleV2ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "TestPancakeOracleV2";
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<TestPancakeOracleV2> {
    return super.deploy(overrides || {}) as Promise<TestPancakeOracleV2>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): TestPancakeOracleV2 {
    return super.attach(address) as TestPancakeOracleV2;
  }
  connect(signer: Signer): TestPancakeOracleV2__factory {
    return super.connect(signer) as TestPancakeOracleV2__factory;
  }
  static readonly contractName: "TestPancakeOracleV2";
  public readonly contractName: "TestPancakeOracleV2";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TestPancakeOracleV2Interface {
    return new utils.Interface(_abi) as TestPancakeOracleV2Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TestPancakeOracleV2 {
    return new Contract(address, _abi, signerOrProvider) as TestPancakeOracleV2;
  }
}
