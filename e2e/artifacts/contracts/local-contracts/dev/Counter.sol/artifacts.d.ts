// This file was autogenerated by hardhat-viem, do not edit it.
// prettier-ignore
// tslint:disable
// eslint-disable

import "hardhat/types/artifacts";
import type { GetContractReturnType } from "@nomicfoundation/hardhat-viem/types";

import type { Counter$Type } from "./Counter";

declare module "hardhat/types/artifacts" {
  interface ArtifactsMap {
    ["Counter"]: Counter$Type;
    ["contracts/local-contracts/dev/Counter.sol:Counter"]: Counter$Type;
  }

  interface ContractTypesMap {
    ["Counter"]: GetContractReturnType<Counter$Type["abi"]>;
    ["contracts/local-contracts/dev/Counter.sol:Counter"]: GetContractReturnType<
      Counter$Type["abi"]
    >;
  }
}
