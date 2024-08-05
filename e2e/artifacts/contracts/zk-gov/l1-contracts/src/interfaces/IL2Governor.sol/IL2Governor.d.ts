// This file was autogenerated by hardhat-viem, do not edit it.
// prettier-ignore
// tslint:disable
// eslint-disable

import type { Address } from "viem";
import type { GetContractReturnType } from "@nomicfoundation/hardhat-viem/types";
import "@nomicfoundation/hardhat-viem/types";

export interface IL2Governor$Type {
  _format: "hh-sol-artifact-1";
  contractName: "IL2Governor";
  sourceName: "contracts/zk-gov/l1-contracts/src/interfaces/IL2Governor.sol";
  abi: [
    {
      inputs: [
        {
          internalType: "address[]";
          name: "_targets";
          type: "address[]";
        },
        {
          internalType: "uint256[]";
          name: "_values";
          type: "uint256[]";
        },
        {
          internalType: "bytes[]";
          name: "_calldatas";
          type: "bytes[]";
        },
        {
          internalType: "bytes32";
          name: "_descriptionHash";
          type: "bytes32";
        },
      ];
      name: "cancel";
      outputs: [];
      stateMutability: "nonpayable";
      type: "function";
    },
    {
      inputs: [
        {
          internalType: "address[]";
          name: "_targets";
          type: "address[]";
        },
        {
          internalType: "uint256[]";
          name: "_values";
          type: "uint256[]";
        },
        {
          internalType: "bytes[]";
          name: "_calldatas";
          type: "bytes[]";
        },
        {
          internalType: "string";
          name: "_description";
          type: "string";
        },
      ];
      name: "propose";
      outputs: [];
      stateMutability: "nonpayable";
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
    contractName: "IL2Governor",
    constructorArgs?: [],
    config?: DeployContractConfig
  ): Promise<GetContractReturnType<IL2Governor$Type["abi"]>>;
  export function deployContract(
    contractName: "contracts/zk-gov/l1-contracts/src/interfaces/IL2Governor.sol:IL2Governor",
    constructorArgs?: [],
    config?: DeployContractConfig
  ): Promise<GetContractReturnType<IL2Governor$Type["abi"]>>;

  export function sendDeploymentTransaction(
    contractName: "IL2Governor",
    constructorArgs?: [],
    config?: SendDeploymentTransactionConfig
  ): Promise<{
    contract: GetContractReturnType<IL2Governor$Type["abi"]>;
    deploymentTransaction: GetTransactionReturnType;
  }>;
  export function sendDeploymentTransaction(
    contractName: "contracts/zk-gov/l1-contracts/src/interfaces/IL2Governor.sol:IL2Governor",
    constructorArgs?: [],
    config?: SendDeploymentTransactionConfig
  ): Promise<{
    contract: GetContractReturnType<IL2Governor$Type["abi"]>;
    deploymentTransaction: GetTransactionReturnType;
  }>;

  export function getContractAt(
    contractName: "IL2Governor",
    address: Address,
    config?: GetContractAtConfig
  ): Promise<GetContractReturnType<IL2Governor$Type["abi"]>>;
  export function getContractAt(
    contractName: "contracts/zk-gov/l1-contracts/src/interfaces/IL2Governor.sol:IL2Governor",
    address: Address,
    config?: GetContractAtConfig
  ): Promise<GetContractReturnType<IL2Governor$Type["abi"]>>;
}
