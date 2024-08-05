// This file was autogenerated by hardhat-viem, do not edit it.
// prettier-ignore
// tslint:disable
// eslint-disable

import "hardhat/types/artifacts";
import type { GetContractReturnType } from "@nomicfoundation/hardhat-viem/types";

import type { SecurityCouncil$Type } from "./SecurityCouncil";

declare module "hardhat/types/artifacts" {
  interface ArtifactsMap {
    ["SecurityCouncil"]: SecurityCouncil$Type;
    ["contracts/zk-gov/l1-contracts/src/SecurityCouncil.sol:SecurityCouncil"]: SecurityCouncil$Type;
  }

  interface ContractTypesMap {
    ["SecurityCouncil"]: GetContractReturnType<SecurityCouncil$Type["abi"]>;
    ["contracts/zk-gov/l1-contracts/src/SecurityCouncil.sol:SecurityCouncil"]: GetContractReturnType<
      SecurityCouncil$Type["abi"]
    >;
  }
}
