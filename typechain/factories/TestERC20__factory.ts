/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { TestERC20, TestERC20Interface } from "../TestERC20";

const _abi = [
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
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
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
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
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
    name: "MINTER_ROLE",
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
    name: "PAUSER_ROLE",
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
    name: "__TestERC20_init",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
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
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
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
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burnFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burnWithoutApproval",
    outputs: [],
    stateMutability: "nonpayable",
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
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleAdmin",
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
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "getRoleMember",
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
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleMemberCount",
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
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
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
    name: "initialize",
    outputs: [],
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
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "minter",
        type: "address",
      },
    ],
    name: "setMinter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "decimal",
        type: "uint8",
      },
    ],
    name: "setupDecimals",
    outputs: [],
    stateMutability: "nonpayable",
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
        name: "recipient",
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
        name: "sender",
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
  {
    inputs: [],
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5061201a806100206000396000f3fe608060405234801561001057600080fd5b50600436106101f05760003560e01c806379cc67901161010f578063ca15c873116100a2578063dd90458811610071578063dd90458814610414578063e63ab1e914610721578063fca3b5aa14610729578063fe947ffe1461074f576101f0565b8063ca15c873146106a2578063d5391393146106bf578063d547741f146106c7578063dd62ed3e146106f3576101f0565b806395d89b41116100de57806395d89b411461063a578063a217fddf14610642578063a457c2d71461064a578063a9059cbb14610676576101f0565b806379cc67901461059b5780638456cb59146105c75780639010d07c146105cf57806391d148541461060e576101f0565b806339509351116101875780634cd88b76116101565780634cd88b7614610414578063540ba01d146105415780635c975abb1461056d57806370a0823114610575576101f0565b806339509351146103975780633f4ba83a146103c357806340c10f19146103cb57806342966c68146103f7576101f0565b8063248a9ca3116101c3578063248a9ca3146103025780632f2ff15d1461031f578063313ce5671461034d57806336568abe1461036b576101f0565b806306fdde03146101f5578063095ea7b31461027257806318160ddd146102b257806323b872dd146102cc575b600080fd5b6101fd61076f565b6040805160208082528351818301528351919283929083019185019080838360005b8381101561023757818101518382015260200161021f565b50505050905090810190601f1680156102645780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b61029e6004803603604081101561028857600080fd5b506001600160a01b038135169060200135610805565b604080519115158252519081900360200190f35b6102ba610823565b60408051918252519081900360200190f35b61029e600480360360608110156102e257600080fd5b506001600160a01b03813581169160208101359091169060400135610829565b6102ba6004803603602081101561031857600080fd5b50356108b0565b61034b6004803603604081101561033557600080fd5b50803590602001356001600160a01b03166108c5565b005b610355610931565b6040805160ff9092168252519081900360200190f35b61034b6004803603604081101561038157600080fd5b50803590602001356001600160a01b031661093a565b61029e600480360360408110156103ad57600080fd5b506001600160a01b03813516906020013561099b565b61034b6109e9565b61034b600480360360408110156103e157600080fd5b506001600160a01b038135169060200135610a48565b61034b6004803603602081101561040d57600080fd5b5035610aa7565b61034b6004803603604081101561042a57600080fd5b81019060208101813564010000000081111561044557600080fd5b82018360208201111561045757600080fd5b8035906020019184600183028401116401000000008311171561047957600080fd5b91908080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525092959493602081019350359150506401000000008111156104cc57600080fd5b8201836020820111156104de57600080fd5b8035906020019184600183028401116401000000008311171561050057600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550610abb945050505050565b61034b6004803603604081101561055757600080fd5b506001600160a01b038135169060200135610b69565b61029e610b73565b6102ba6004803603602081101561058b57600080fd5b50356001600160a01b0316610b7c565b61034b600480360360408110156105b157600080fd5b506001600160a01b038135169060200135610b97565b61034b610bec565b6105f2600480360360408110156105e557600080fd5b5080359060200135610c49565b604080516001600160a01b039092168252519081900360200190f35b61029e6004803603604081101561062457600080fd5b50803590602001356001600160a01b0316610c68565b6101fd610c80565b6102ba610ce1565b61029e6004803603604081101561066057600080fd5b506001600160a01b038135169060200135610ce6565b61029e6004803603604081101561068c57600080fd5b506001600160a01b038135169060200135610d4e565b6102ba600480360360208110156106b857600080fd5b5035610d62565b6102ba610d79565b61034b600480360360408110156106dd57600080fd5b50803590602001356001600160a01b0316610d8b565b6102ba6004803603604081101561070957600080fd5b506001600160a01b0381358116916020013516610de4565b6102ba610e0f565b61034b6004803603602081101561073f57600080fd5b50356001600160a01b0316610e21565b61034b6004803603602081101561076557600080fd5b503560ff16610e39565b60688054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156107fb5780601f106107d0576101008083540402835291602001916107fb565b820191906000526020600020905b8154815290600101906020018083116107de57829003601f168201915b5050505050905090565b6000610819610812610e42565b8484610e46565b5060015b92915050565b60675490565b6000610836848484610f32565b6108a684610842610e42565b6108a185604051806060016040528060288152602001611e04602891396001600160a01b038a16600090815260666020526040812090610880610e42565b6001600160a01b03168152602081019190915260400160002054919061108f565b610e46565b5060019392505050565b60009081526033602052604090206002015490565b6000828152603360205260409020600201546108e8906108e3610e42565b610c68565b6109235760405162461bcd60e51b815260040180806020018281038252602f815260200180611cd4602f913960400191505060405180910390fd5b61092d8282611126565b5050565b606a5460ff1690565b610942610e42565b6001600160a01b0316816001600160a01b0316146109915760405162461bcd60e51b815260040180806020018281038252602f815260200180611f8c602f913960400191505060405180910390fd5b61092d828261118f565b60006108196109a8610e42565b846108a185606660006109b9610e42565b6001600160a01b03908116825260208083019390935260409182016000908120918c1681529252902054906111f8565b610a03600080516020611e2c8339815191526108e3610e42565b610a3e5760405162461bcd60e51b8152600401808060200182810382526039815260200180611d256039913960400191505060405180910390fd5b610a46611252565b565b610a62600080516020611ea68339815191526108e3610e42565b610a9d5760405162461bcd60e51b8152600401808060200182810382526036815260200180611e4c6036913960400191505060405180910390fd5b61092d82826112f2565b610ab8610ab2610e42565b826113e4565b50565b600054610100900460ff1680610ad45750610ad46114e0565b80610ae2575060005460ff16155b610b1d5760405162461bcd60e51b815260040180806020018281038252602e815260200180611dd6602e913960400191505060405180910390fd5b600054610100900460ff16158015610b48576000805460ff1961ff0019909116610100171660011790555b610b5283836114f1565b8015610b64576000805461ff00191690555b505050565b61092d82826113e4565b60c95460ff1690565b6001600160a01b031660009081526065602052604090205490565b6000610bce82604051806060016040528060248152602001611e8260249139610bc786610bc2610e42565b610de4565b919061108f565b9050610be283610bdc610e42565b83610e46565b610b6483836113e4565b610c06600080516020611e2c8339815191526108e3610e42565b610c415760405162461bcd60e51b8152600401808060200182810382526037815260200180611f306037913960400191505060405180910390fd5b610a466115ba565b6000828152603360205260408120610c61908361163d565b9392505050565b6000828152603360205260408120610c619083611649565b60698054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156107fb5780601f106107d0576101008083540402835291602001916107fb565b600081565b6000610819610cf3610e42565b846108a185604051806060016040528060258152602001611f676025913960666000610d1d610e42565b6001600160a01b03908116825260208083019390935260409182016000908120918d1681529252902054919061108f565b6000610819610d5b610e42565b8484610f32565b600081815260336020526040812061081d9061165e565b600080516020611ea683398151915281565b600082815260336020526040902060020154610da9906108e3610e42565b6109915760405162461bcd60e51b8152600401808060200182810382526030815260200180611da66030913960400191505060405180910390fd5b6001600160a01b03918216600090815260666020908152604080832093909416825291909152205490565b600080516020611e2c83398151915281565b610ab8600080516020611ea6833981519152826108c5565b610ab881611669565b3390565b6001600160a01b038316610e8b5760405162461bcd60e51b8152600401808060200182810382526024815260200180611f0c6024913960400191505060405180910390fd5b6001600160a01b038216610ed05760405162461bcd60e51b8152600401808060200182810382526022815260200180611d5e6022913960400191505060405180910390fd5b6001600160a01b03808416600081815260666020908152604080832094871680845294825291829020859055815185815291517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259281900390910190a3505050565b6001600160a01b038316610f775760405162461bcd60e51b8152600401808060200182810382526025815260200180611ee76025913960400191505060405180910390fd5b6001600160a01b038216610fbc5760405162461bcd60e51b8152600401808060200182810382526023815260200180611cb16023913960400191505060405180910390fd5b610fc783838361167f565b61100481604051806060016040528060268152602001611d80602691396001600160a01b038616600090815260656020526040902054919061108f565b6001600160a01b03808516600090815260656020526040808220939093559084168152205461103390826111f8565b6001600160a01b0380841660008181526065602090815260409182902094909455805185815290519193928716927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92918290030190a3505050565b6000818484111561111e5760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b838110156110e35781810151838201526020016110cb565b50505050905090810190601f1680156111105780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b505050900390565b600082815260336020526040902061113e908261168a565b1561092d5761114b610e42565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b60008281526033602052604090206111a7908261169f565b1561092d576111b4610e42565b6001600160a01b0316816001600160a01b0316837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45050565b600082820183811015610c61576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b61125a610b73565b6112a2576040805162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881b9bdd081c185d5cd95960621b604482015290519081900360640190fd5b60c9805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa6112d5610e42565b604080516001600160a01b039092168252519081900360200190a1565b6001600160a01b03821661134d576040805162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015290519081900360640190fd5b6113596000838361167f565b60675461136690826111f8565b6067556001600160a01b03821660009081526065602052604090205461138c90826111f8565b6001600160a01b03831660008181526065602090815260408083209490945583518581529351929391927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a35050565b6001600160a01b0382166114295760405162461bcd60e51b8152600401808060200182810382526021815260200180611ec66021913960400191505060405180910390fd5b6114358260008361167f565b61147281604051806060016040528060228152602001611d03602291396001600160a01b038516600090815260656020526040902054919061108f565b6001600160a01b03831660009081526065602052604090205560675461149890826116b4565b6067556040805182815290516000916001600160a01b038516917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9181900360200190a35050565b60006114eb30611711565b15905090565b600054610100900460ff168061150a575061150a6114e0565b80611518575060005460ff16155b6115535760405162461bcd60e51b815260040180806020018281038252602e815260200180611dd6602e913960400191505060405180910390fd5b600054610100900460ff1615801561157e576000805460ff1961ff0019909116610100171660011790555b611586611717565b61158e611717565b61159883836117b8565b6115a0611717565b6115a8611890565b6115b0611717565b610b52838361193b565b6115c2610b73565b15611607576040805162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b604482015290519081900360640190fd5b60c9805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a2586112d5610e42565b6000610c618383611a0e565b6000610c61836001600160a01b038416611a72565b600061081d82611a8a565b606a805460ff191660ff92909216919091179055565b610b64838383611a8e565b6000610c61836001600160a01b038416611add565b6000610c61836001600160a01b038416611b27565b60008282111561170b576040805162461bcd60e51b815260206004820152601e60248201527f536166654d6174683a207375627472616374696f6e206f766572666c6f770000604482015290519081900360640190fd5b50900390565b3b151590565b600054610100900460ff168061173057506117306114e0565b8061173e575060005460ff16155b6117795760405162461bcd60e51b815260040180806020018281038252602e815260200180611dd6602e913960400191505060405180910390fd5b600054610100900460ff161580156117a4576000805460ff1961ff0019909116610100171660011790555b8015610ab8576000805461ff001916905550565b600054610100900460ff16806117d157506117d16114e0565b806117df575060005460ff16155b61181a5760405162461bcd60e51b815260040180806020018281038252602e815260200180611dd6602e913960400191505060405180910390fd5b600054610100900460ff16158015611845576000805460ff1961ff0019909116610100171660011790555b8251611858906068906020860190611bed565b50815161186c906069906020850190611bed565b50606a805460ff191660121790558015610b64576000805461ff0019169055505050565b600054610100900460ff16806118a957506118a96114e0565b806118b7575060005460ff16155b6118f25760405162461bcd60e51b815260040180806020018281038252602e815260200180611dd6602e913960400191505060405180910390fd5b600054610100900460ff1615801561191d576000805460ff1961ff0019909116610100171660011790555b60c9805460ff191690558015610ab8576000805461ff001916905550565b600054610100900460ff168061195457506119546114e0565b80611962575060005460ff16155b61199d5760405162461bcd60e51b815260040180806020018281038252602e815260200180611dd6602e913960400191505060405180910390fd5b600054610100900460ff161580156119c8576000805460ff1961ff0019909116610100171660011790555b6119da60006119d5610e42565b610923565b6119f4600080516020611ea68339815191526119d5610e42565b610b52600080516020611e2c8339815191526119d5610e42565b81546000908210611a505760405162461bcd60e51b8152600401808060200182810382526022815260200180611c8f6022913960400191505060405180910390fd5b826000018281548110611a5f57fe5b9060005260206000200154905092915050565b60009081526001919091016020526040902054151590565b5490565b611a99838383610b64565b611aa1610b73565b15610b645760405162461bcd60e51b815260040180806020018281038252602a815260200180611fbb602a913960400191505060405180910390fd5b6000611ae98383611a72565b611b1f5750815460018181018455600084815260208082209093018490558454848252828601909352604090209190915561081d565b50600061081d565b60008181526001830160205260408120548015611be35783546000198083019190810190600090879083908110611b5a57fe5b9060005260206000200154905080876000018481548110611b7757fe5b600091825260208083209091019290925582815260018981019092526040902090840190558654879080611ba757fe5b6001900381819060005260206000200160009055905586600101600087815260200190815260200160002060009055600194505050505061081d565b600091505061081d565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282611c235760008555611c69565b82601f10611c3c57805160ff1916838001178555611c69565b82800160010185558215611c69579182015b82811115611c69578251825591602001919060010190611c4e565b50611c75929150611c79565b5090565b5b80821115611c755760008155600101611c7a56fe456e756d657261626c655365743a20696e646578206f7574206f6620626f756e647345524332303a207472616e7366657220746f20746865207a65726f2061646472657373416363657373436f6e74726f6c3a2073656e646572206d75737420626520616e2061646d696e20746f206772616e7445524332303a206275726e20616d6f756e7420657863656564732062616c616e636545524332305072657365744d696e7465725061757365723a206d75737420686176652070617573657220726f6c6520746f20756e706175736545524332303a20617070726f766520746f20746865207a65726f206164647265737345524332303a207472616e7366657220616d6f756e7420657863656564732062616c616e6365416363657373436f6e74726f6c3a2073656e646572206d75737420626520616e2061646d696e20746f207265766f6b65496e697469616c697a61626c653a20636f6e747261637420697320616c726561647920696e697469616c697a656445524332303a207472616e7366657220616d6f756e74206578636565647320616c6c6f77616e636565d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a45524332305072657365744d696e7465725061757365723a206d7573742068617665206d696e74657220726f6c6520746f206d696e7445524332303a206275726e20616d6f756e74206578636565647320616c6c6f77616e63659f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a645524332303a206275726e2066726f6d20746865207a65726f206164647265737345524332303a207472616e736665722066726f6d20746865207a65726f206164647265737345524332303a20617070726f76652066726f6d20746865207a65726f206164647265737345524332305072657365744d696e7465725061757365723a206d75737420686176652070617573657220726f6c6520746f20706175736545524332303a2064656372656173656420616c6c6f77616e63652062656c6f77207a65726f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636520726f6c657320666f722073656c6645524332305061757361626c653a20746f6b656e207472616e73666572207768696c6520706175736564a26469706673582212209b5ac2cc746922ba05ef85a13ec7b566457a83dbb92f80f4d82d36d0217ee59a64736f6c63430007060033";

export class TestERC20__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<TestERC20> {
    return super.deploy(overrides || {}) as Promise<TestERC20>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): TestERC20 {
    return super.attach(address) as TestERC20;
  }
  connect(signer: Signer): TestERC20__factory {
    return super.connect(signer) as TestERC20__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TestERC20Interface {
    return new utils.Interface(_abi) as TestERC20Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TestERC20 {
    return new Contract(address, _abi, signerOrProvider) as TestERC20;
  }
}
