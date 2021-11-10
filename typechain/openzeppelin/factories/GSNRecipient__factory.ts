/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { GSNRecipient, GSNRecipientInterface } from "../GSNRecipient";

const _abi = [
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
        name: "relay",
        type: "address",
      },
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "encodedFunction",
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
        name: "gasLimit",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "nonce",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "approvalData",
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
];

export class GSNRecipient__factory {
  static readonly abi = _abi;
  static createInterface(): GSNRecipientInterface {
    return new utils.Interface(_abi) as GSNRecipientInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): GSNRecipient {
    return new Contract(address, _abi, signerOrProvider) as GSNRecipient;
  }
}
