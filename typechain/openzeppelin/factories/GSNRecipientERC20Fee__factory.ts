/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  GSNRecipientERC20Fee,
  GSNRecipientERC20FeeInterface,
} from "../GSNRecipientERC20Fee";

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
        name: "oldRelayHub",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newRelayHub",
        type: "address",
      },
    ],
    name: "RelayHubChanged",
    type: "event",
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
        name: "from",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "transactionFee",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "gasPrice",
        type: "uint256",
      },
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
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "maxPossibleCharge",
        type: "uint256",
      },
    ],
    name: "acceptRelayedCall",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getHubAddr",
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
        internalType: "bytes",
        name: "context",
        type: "bytes",
      },
      {
        internalType: "bool",
        name: "success",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "actualCharge",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "preRetVal",
        type: "bytes32",
      },
    ],
    name: "postRelayedCall",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "context",
        type: "bytes",
      },
    ],
    name: "preRelayedCall",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "relayHubVersion",
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
    name: "token",
    outputs: [
      {
        internalType: "contract __unstable__ERC20Owned",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405273d216153c06e857cd7f72665e0af1d7d82172f4946000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055503480156200006557600080fd5b506040516200306638038062003066833981810160405260408110156200008b57600080fd5b8101908080516040519392919084640100000000821115620000ac57600080fd5b83820191506020820185811115620000c357600080fd5b8251866001820283011164010000000082111715620000e157600080fd5b8083526020830192505050908051906020019080838360005b8381101562000117578082015181840152602081019050620000fa565b50505050905090810190601f168015620001455780820380516001836020036101000a031916815260200191505b50604052602001805160405193929190846401000000008211156200016957600080fd5b838201915060208201858111156200018057600080fd5b82518660018202830111640100000000821117156200019e57600080fd5b8083526020830192505050908051906020019080838360005b83811015620001d4578082015181840152602081019050620001b7565b50505050905090810190601f168015620002025780820380516001836020036101000a031916815260200191505b506040525050508181604051620002199062000360565b808060200180602001838103835285818151815260200191508051906020019080838360005b838110156200025c5780820151818401526020810190506200023f565b50505050905090810190601f1680156200028a5780820380516001836020036101000a031916815260200191505b50838103825284818151815260200191508051906020019080838360005b83811015620002c5578082015181840152602081019050620002a8565b50505050905090810190601f168015620002f35780820380516001836020036101000a031916815260200191505b50945050505050604051809103906000f08015801562000317573d6000803e3d6000fd5b50600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050506200036e565b611ce0806200138683390190565b611008806200037e6000396000f3fe608060405234801561001057600080fd5b50600436106100625760003560e01c806374e861d61461006757806380274db71461009b57806383947ea01461016a578063ad61ccd5146103af578063e06e0e2214610432578063fc0c546a1461050d575b600080fd5b61006f610541565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b610154600480360360208110156100b157600080fd5b81019080803590602001906401000000008111156100ce57600080fd5b8201836020820111156100e057600080fd5b8035906020019184600183028401116401000000008311171561010257600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f82011690508083019250505050505050919291929050505061056a565b6040518082815260200191505060405180910390f35b61032d600480360361012081101561018157600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001906401000000008111156101de57600080fd5b8201836020820111156101f057600080fd5b8035906020019184600183028401116401000000008311171561021257600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509192919290803590602001909291908035906020019092919080359060200190929190803590602001909291908035906020019064010000000081111561029d57600080fd5b8201836020820111156102af57600080fd5b803590602001918460018302840111640100000000831117156102d157600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f82011690508083019250505050505050919291929080359060200190929190505050610607565b6040518083815260200180602001828103825283818151815260200191508051906020019080838360005b83811015610373578082015181840152602081019050610358565b50505050905090810190601f1680156103a05780820380516001836020036101000a031916815260200191505b50935050505060405180910390f35b6103b7610741565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156103f75780820151818401526020810190506103dc565b50505050905090810190601f1680156104245780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b61050b6004803603608081101561044857600080fd5b810190808035906020019064010000000081111561046557600080fd5b82018360208201111561047757600080fd5b8035906020019184600183028401116401000000008311171561049957600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509192919290803515159060200190929190803590602001909291908035906020019092919050505061077e565b005b61051561081b565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6000610574610541565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146105f7576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526024815260200180610f856024913960400191505060405180910390fd5b61060082610845565b9050919050565b600060608261061461081b565b73ffffffffffffffffffffffffffffffffffffffff166370a082318c6040518263ffffffff1660e01b8152600401808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060206040518083038186803b15801561067a57600080fd5b505afa15801561068e573d6000803e3d6000fd5b505050506040513d60208110156106a457600080fd5b810190808051906020019092919050505010156106d8576106cf6000808111156106ca57fe5b6108bf565b91509150610733565b61072e8a848a8a604051602001808573ffffffffffffffffffffffffffffffffffffffff1681526020018481526020018381526020018281526020019450505050506040516020818303038152906040526108e0565b915091505b995099975050505050505050565b60606040518060400160405280600581526020017f312e302e30000000000000000000000000000000000000000000000000000000815250905090565b610786610541565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610809576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526024815260200180610f856024913960400191505060405180910390fd5b610815848484846108f0565b50505050565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b600080600083806020019051604081101561085f57600080fd5b810190808051906020019092919080519060200190929190505050915091506108b282308361088c61081b565b73ffffffffffffffffffffffffffffffffffffffff166109cc909392919063ffffffff16565b6000801b92505050919050565b6000606082600b016040518060200160405280600081525091509150915091565b6000606060008391509150915091565b60008060008087806020019051608081101561090b57600080fd5b81019080805190602001909291908051906020019092919080519060200190929190805190602001909291905050509350935093509350600061096661095f612710620186a0610a8d90919063ffffffff16565b8385610b10565b905061097b8188610a8d90919063ffffffff16565b96506109c1856109948987610a8d90919063ffffffff16565b61099c61081b565b73ffffffffffffffffffffffffffffffffffffffff16610b2d9092919063ffffffff16565b505050505050505050565b610a87846323b872dd60e01b858585604051602401808473ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019350505050604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050610bcf565b50505050565b600082821115610b05576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601e8152602001807f536166654d6174683a207375627472616374696f6e206f766572666c6f77000081525060200191505060405180910390fd5b818303905092915050565b60006064826064018486020281610b2357fe5b0490509392505050565b610bca8363a9059cbb60e01b8484604051602401808373ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050610bcf565b505050565b6060610c31826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c65648152508573ffffffffffffffffffffffffffffffffffffffff16610cbe9092919063ffffffff16565b9050600081511115610cb957808060200190516020811015610c5257600080fd5b8101908080519060200190929190505050610cb8576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602a815260200180610fa9602a913960400191505060405180910390fd5b5b505050565b6060610ccd8484600085610cd6565b90509392505050565b606082471015610d31576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526026815260200180610f5f6026913960400191505060405180910390fd5b610d3a85610e7f565b610dac576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601d8152602001807f416464726573733a2063616c6c20746f206e6f6e2d636f6e747261637400000081525060200191505060405180910390fd5b600060608673ffffffffffffffffffffffffffffffffffffffff1685876040518082805190602001908083835b60208310610dfc5780518252602082019150602081019050602083039250610dd9565b6001836020036101000a03801982511681845116808217855250505050505090500191505060006040518083038185875af1925050503d8060008114610e5e576040519150601f19603f3d011682016040523d82523d6000602084013e610e63565b606091505b5091509150610e73828286610e92565b92505050949350505050565b600080823b905060008111915050919050565b60608315610ea257829050610f57565b600083511115610eb55782518084602001fd5b816040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b83811015610f1c578082015181840152602081019050610f01565b50505050905090810190601f168015610f495780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b939250505056fe416464726573733a20696e73756666696369656e742062616c616e636520666f722063616c6c47534e526563697069656e743a2063616c6c6572206973206e6f742052656c61794875625361666545524332303a204552433230206f7065726174696f6e20646964206e6f742073756363656564a2646970667358221220749358f2771af35a36f1afad52d30406c6fd01b29ab179a36ca48ac198b439c864736f6c634300060c003360806040523480156200001157600080fd5b5060405162001ce038038062001ce0833981810160405260408110156200003757600080fd5b81019080805160405193929190846401000000008211156200005857600080fd5b838201915060208201858111156200006f57600080fd5b82518660018202830111640100000000821117156200008d57600080fd5b8083526020830192505050908051906020019080838360005b83811015620000c3578082015181840152602081019050620000a6565b50505050905090810190601f168015620000f15780820380516001836020036101000a031916815260200191505b50604052602001805160405193929190846401000000008211156200011557600080fd5b838201915060208201858111156200012c57600080fd5b82518660018202830111640100000000821117156200014a57600080fd5b8083526020830192505050908051906020019080838360005b838110156200018057808201518184015260208101905062000163565b50505050905090810190601f168015620001ae5780820380516001836020036101000a031916815260200191505b5060405250505081818160039080519060200190620001cf929190620002c8565b508060049080519060200190620001e8929190620002c8565b506012600560006101000a81548160ff021916908360ff1602179055505050600062000219620002c060201b60201c565b905080600560016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508073ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050506200036e565b600033905090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200030b57805160ff19168380011785556200033c565b828001600101855582156200033c579182015b828111156200033b5782518255916020019190600101906200031e565b5b5090506200034b91906200034f565b5090565b5b808211156200036a57600081600090555060010162000350565b5090565b611962806200037e6000396000f3fe608060405234801561001057600080fd5b50600436106100f55760003560e01c806370a0823111610097578063a457c2d711610066578063a457c2d71461046f578063a9059cbb146104d3578063dd62ed3e14610537578063f2fde38b146105af576100f5565b806370a0823114610356578063715018a6146103ae5780638da5cb5b146103b857806395d89b41146103ec576100f5565b806323b872dd116100d357806323b872dd146101ff578063313ce5671461028357806339509351146102a457806340c10f1914610308576100f5565b806306fdde03146100fa578063095ea7b31461017d57806318160ddd146101e1575b600080fd5b6101026105f3565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610142578082015181840152602081019050610127565b50505050905090810190601f16801561016f5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6101c96004803603604081101561019357600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610695565b60405180821515815260200191505060405180910390f35b6101e96106b3565b6040518082815260200191505060405180910390f35b61026b6004803603606081101561021557600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506106bd565b60405180821515815260200191505060405180910390f35b61028b610723565b604051808260ff16815260200191505060405180910390f35b6102f0600480360360408110156102ba57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919050505061073a565b60405180821515815260200191505060405180910390f35b6103546004803603604081101561031e57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506107ed565b005b6103986004803603602081101561036c57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506108aa565b6040518082815260200191505060405180910390f35b6103b66108f2565b005b6103c0610a62565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6103f4610a8c565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610434578082015181840152602081019050610419565b50505050905090810190601f1680156104615780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6104bb6004803603604081101561048557600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610b2e565b60405180821515815260200191505060405180910390f35b61051f600480360360408110156104e957600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610bfb565b60405180821515815260200191505060405180910390f35b6105996004803603604081101561054d57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610c19565b6040518082815260200191505060405180910390f35b6105f1600480360360208110156105c557600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610c91565b005b606060038054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561068b5780601f106106605761010080835404028352916020019161068b565b820191906000526020600020905b81548152906001019060200180831161066e57829003601f168201915b5050505050905090565b60006106a96106a2610e86565b8484610e8e565b6001905092915050565b6000600254905090565b60006106c7610a62565b73ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16141561070e57610705848484610edf565b6001905061071c565b6107198484846111a0565b90505b9392505050565b6000600560009054906101000a900460ff16905090565b60006107e3610747610e86565b846107de8560016000610758610e86565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461127990919063ffffffff16565b610e8e565b6001905092915050565b6107f5610e86565b73ffffffffffffffffffffffffffffffffffffffff16610813610a62565b73ffffffffffffffffffffffffffffffffffffffff161461089c576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b6108a68282611301565b5050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6108fa610e86565b73ffffffffffffffffffffffffffffffffffffffff16610918610a62565b73ffffffffffffffffffffffffffffffffffffffff16146109a1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff16600560019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a36000600560016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550565b6000600560019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b606060048054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610b245780601f10610af957610100808354040283529160200191610b24565b820191906000526020600020905b815481529060010190602001808311610b0757829003601f168201915b5050505050905090565b6000610bf1610b3b610e86565b84610bec856040518060600160405280602581526020016119086025913960016000610b65610e86565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546114c89092919063ffffffff16565b610e8e565b6001905092915050565b6000610c0f610c08610e86565b8484610edf565b6001905092915050565b6000610c23610a62565b73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610c7e577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff9050610c8b565b610c888383611582565b90505b92915050565b610c99610e86565b73ffffffffffffffffffffffffffffffffffffffff16610cb7610a62565b73ffffffffffffffffffffffffffffffffffffffff1614610d40576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415610dc6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260268152602001806118296026913960400191505060405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff16600560019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a380600560016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b600033905090565b610e96610a62565b73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610ece57610eda565b610ed9838383611609565b5b505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610f65576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260258152602001806118bf6025913960400191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610feb576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260238152602001806118066023913960400191505060405180910390fd5b610ff6838383611800565b61106181604051806060016040528060268152602001611871602691396000808773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546114c89092919063ffffffff16565b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506110f4816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461127990919063ffffffff16565b6000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040518082815260200191505060405180910390a3505050565b60006111ad848484610edf565b61126e846111b9610e86565b6112698560405180606001604052806028815260200161189760289139600160008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600061121f610e86565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546114c89092919063ffffffff16565b610e8e565b600190509392505050565b6000808284019050838110156112f7576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807f536166654d6174683a206164646974696f6e206f766572666c6f77000000000081525060200191505060405180910390fd5b8091505092915050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614156113a4576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601f8152602001807f45524332303a206d696e7420746f20746865207a65726f20616464726573730081525060200191505060405180910390fd5b6113b060008383611800565b6113c58160025461127990919063ffffffff16565b60028190555061141c816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461127990919063ffffffff16565b6000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040518082815260200191505060405180910390a35050565b6000838311158290611575576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561153a57808201518184015260208101905061151f565b50505050905090810190601f1680156115675780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b5082840390509392505050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16141561168f576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260248152602001806118e46024913960400191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415611715576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602281526020018061184f6022913960400191505060405180910390fd5b80600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925836040518082815260200191505060405180910390a3505050565b50505056fe45524332303a207472616e7366657220746f20746865207a65726f20616464726573734f776e61626c653a206e6577206f776e657220697320746865207a65726f206164647265737345524332303a20617070726f766520746f20746865207a65726f206164647265737345524332303a207472616e7366657220616d6f756e7420657863656564732062616c616e636545524332303a207472616e7366657220616d6f756e74206578636565647320616c6c6f77616e636545524332303a207472616e736665722066726f6d20746865207a65726f206164647265737345524332303a20617070726f76652066726f6d20746865207a65726f206164647265737345524332303a2064656372656173656420616c6c6f77616e63652062656c6f77207a65726fa2646970667358221220bdcd60f6e1c1eaec85b8e9008fc7615d8ea935c1f73daecaa5c79da34a4b8c4164736f6c634300060c0033";

export class GSNRecipientERC20Fee__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    name: string,
    symbol: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<GSNRecipientERC20Fee> {
    return super.deploy(
      name,
      symbol,
      overrides || {}
    ) as Promise<GSNRecipientERC20Fee>;
  }
  getDeployTransaction(
    name: string,
    symbol: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(name, symbol, overrides || {});
  }
  attach(address: string): GSNRecipientERC20Fee {
    return super.attach(address) as GSNRecipientERC20Fee;
  }
  connect(signer: Signer): GSNRecipientERC20Fee__factory {
    return super.connect(signer) as GSNRecipientERC20Fee__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): GSNRecipientERC20FeeInterface {
    return new utils.Interface(_abi) as GSNRecipientERC20FeeInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): GSNRecipientERC20Fee {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as GSNRecipientERC20Fee;
  }
}
