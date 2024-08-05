// This file was autogenerated by hardhat-viem, do not edit it.
// prettier-ignore
// tslint:disable
// eslint-disable

import type { Address } from "viem";
import type { GetContractReturnType } from "@nomicfoundation/hardhat-viem/types";
import "@nomicfoundation/hardhat-viem/types";

export interface IZKsyncEra$Type {
  _format: "hh-sol-artifact-1";
  contractName: "IZKsyncEra";
  sourceName: "contracts/zk-gov/l1-contracts/src/interfaces/IZKsyncEra.sol";
  abi: [
    {
      inputs: [
        {
          internalType: "uint256";
          name: "_batchNumber";
          type: "uint256";
        },
        {
          internalType: "uint256";
          name: "_index";
          type: "uint256";
        },
        {
          components: [
            {
              internalType: "uint16";
              name: "txNumberInBatch";
              type: "uint16";
            },
            {
              internalType: "address";
              name: "sender";
              type: "address";
            },
            {
              internalType: "bytes";
              name: "data";
              type: "bytes";
            },
          ];
          internalType: "struct IZKsyncEra.L2Message";
          name: "_message";
          type: "tuple";
        },
        {
          internalType: "bytes32[]";
          name: "_proof";
          type: "bytes32[]";
        },
      ];
      name: "proveL2MessageInclusion";
      outputs: [
        {
          internalType: "bool";
          name: "";
          type: "bool";
        },
      ];
      stateMutability: "view";
      type: "function";
    },
    {
      inputs: [
        {
          internalType: "address";
          name: "_contractL2";
          type: "address";
        },
        {
          internalType: "uint256";
          name: "_l2Value";
          type: "uint256";
        },
        {
          internalType: "bytes";
          name: "_calldata";
          type: "bytes";
        },
        {
          internalType: "uint256";
          name: "_l2GasLimit";
          type: "uint256";
        },
        {
          internalType: "uint256";
          name: "_l2GasPerPubdataByteLimit";
          type: "uint256";
        },
        {
          internalType: "bytes[]";
          name: "_factoryDeps";
          type: "bytes[]";
        },
        {
          internalType: "address";
          name: "_refundRecipient";
          type: "address";
        },
      ];
      name: "requestL2Transaction";
      outputs: [];
      stateMutability: "payable";
      type: "function";
    },
  ];
  bytecode: "0x";
  deployedBytecode: "0x";
  linkReferences: {};
  deployedLinkReferences: {};
}

declare module "@nomicfoundation/hardhat-viem/types" {
  export function deployContract(
    contractName: "IZKsyncEra",
    constructorArgs?: [],
    config?: DeployContractConfig
  ): Promise<GetContractReturnType<IZKsyncEra$Type["abi"]>>;
  export function deployContract(
    contractName: "contracts/zk-gov/l1-contracts/src/interfaces/IZKsyncEra.sol:IZKsyncEra",
    constructorArgs?: [],
    config?: DeployContractConfig
  ): Promise<GetContractReturnType<IZKsyncEra$Type["abi"]>>;

  export function sendDeploymentTransaction(
    contractName: "IZKsyncEra",
    constructorArgs?: [],
    config?: SendDeploymentTransactionConfig
  ): Promise<{
    contract: GetContractReturnType<IZKsyncEra$Type["abi"]>;
    deploymentTransaction: GetTransactionReturnType;
  }>;
  export function sendDeploymentTransaction(
    contractName: "contracts/zk-gov/l1-contracts/src/interfaces/IZKsyncEra.sol:IZKsyncEra",
    constructorArgs?: [],
    config?: SendDeploymentTransactionConfig
  ): Promise<{
    contract: GetContractReturnType<IZKsyncEra$Type["abi"]>;
    deploymentTransaction: GetTransactionReturnType;
  }>;

  export function getContractAt(
    contractName: "IZKsyncEra",
    address: Address,
    config?: GetContractAtConfig
  ): Promise<GetContractReturnType<IZKsyncEra$Type["abi"]>>;
  export function getContractAt(
    contractName: "contracts/zk-gov/l1-contracts/src/interfaces/IZKsyncEra.sol:IZKsyncEra",
    address: Address,
    config?: GetContractAtConfig
  ): Promise<GetContractReturnType<IZKsyncEra$Type["abi"]>>;
}
