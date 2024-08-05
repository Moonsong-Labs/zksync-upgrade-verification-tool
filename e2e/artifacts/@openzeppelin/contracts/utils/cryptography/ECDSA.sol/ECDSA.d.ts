// This file was autogenerated by hardhat-viem, do not edit it.
// prettier-ignore
// tslint:disable
// eslint-disable

import type { Address } from "viem";
import type { GetContractReturnType } from "@nomicfoundation/hardhat-viem/types";
import "@nomicfoundation/hardhat-viem/types";

export interface ECDSA$Type {
  _format: "hh-sol-artifact-1";
  contractName: "ECDSA";
  sourceName: "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
  abi: [
    {
      inputs: [];
      name: "ECDSAInvalidSignature";
      type: "error";
    },
    {
      inputs: [
        {
          internalType: "uint256";
          name: "length";
          type: "uint256";
        },
      ];
      name: "ECDSAInvalidSignatureLength";
      type: "error";
    },
    {
      inputs: [
        {
          internalType: "bytes32";
          name: "s";
          type: "bytes32";
        },
      ];
      name: "ECDSAInvalidSignatureS";
      type: "error";
    },
  ];
  bytecode: "0x60566050600b82828239805160001a6073146043577f4e487b7100000000000000000000000000000000000000000000000000000000600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea2646970667358221220a0f0af1e89f3ddbdff57fa81e414c48e503c1b1d880410ba3858747441326c1664736f6c63430008180033";
  deployedBytecode: "0x73000000000000000000000000000000000000000030146080604052600080fdfea2646970667358221220a0f0af1e89f3ddbdff57fa81e414c48e503c1b1d880410ba3858747441326c1664736f6c63430008180033";
  linkReferences: {};
  deployedLinkReferences: {};
}

declare module "@nomicfoundation/hardhat-viem/types" {
  export function deployContract(
    contractName: "ECDSA",
    constructorArgs?: [],
    config?: DeployContractConfig
  ): Promise<GetContractReturnType<ECDSA$Type["abi"]>>;
  export function deployContract(
    contractName: "@openzeppelin/contracts/utils/cryptography/ECDSA.sol:ECDSA",
    constructorArgs?: [],
    config?: DeployContractConfig
  ): Promise<GetContractReturnType<ECDSA$Type["abi"]>>;

  export function sendDeploymentTransaction(
    contractName: "ECDSA",
    constructorArgs?: [],
    config?: SendDeploymentTransactionConfig
  ): Promise<{
    contract: GetContractReturnType<ECDSA$Type["abi"]>;
    deploymentTransaction: GetTransactionReturnType;
  }>;
  export function sendDeploymentTransaction(
    contractName: "@openzeppelin/contracts/utils/cryptography/ECDSA.sol:ECDSA",
    constructorArgs?: [],
    config?: SendDeploymentTransactionConfig
  ): Promise<{
    contract: GetContractReturnType<ECDSA$Type["abi"]>;
    deploymentTransaction: GetTransactionReturnType;
  }>;

  export function getContractAt(
    contractName: "ECDSA",
    address: Address,
    config?: GetContractAtConfig
  ): Promise<GetContractReturnType<ECDSA$Type["abi"]>>;
  export function getContractAt(
    contractName: "@openzeppelin/contracts/utils/cryptography/ECDSA.sol:ECDSA",
    address: Address,
    config?: GetContractAtConfig
  ): Promise<GetContractReturnType<ECDSA$Type["abi"]>>;
}
