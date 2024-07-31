import { l1Rpc } from "@/.server/service/clients";
import { guardiansAbi, scAbi, upgradeHandlerAbi } from "@/.server/service/contract-abis";
import { env } from "@config/env.server";
import { zodHex } from "validate-cli";
import type { Hex } from "viem";
import { z } from "zod";

const upgradeHandlerAddress = env.UPGRADE_HANDLER_ADDRESS;

const range = (l: number): number[] => new Array(l).fill(0).map((_, i) => i);

export const UserRole = z.enum(["guardian", "securityCouncil", "visitor"]);
export async function guardiansAddress(): Promise<Hex> {
  return l1Rpc.contractRead(upgradeHandlerAddress, "guardians", upgradeHandlerAbi.raw, zodHex);
}

export async function emergencyBoardAddress(): Promise<Hex> {
  return l1Rpc.contractRead(
    upgradeHandlerAddress,
    "emergencyUpgradeBoard",
    upgradeHandlerAbi.raw,
    zodHex
  );
}

export async function councilAddress(): Promise<Hex> {
  return l1Rpc.contractRead(
    upgradeHandlerAddress,
    "securityCouncil",
    upgradeHandlerAbi.raw,
    zodHex
  );
}

export async function guardianMembers(): Promise<Hex[]> {
  return Promise.all(
    range(8).map(async (i) =>
      l1Rpc.contractRead(await guardiansAddress(), "members", guardiansAbi.raw, z.any(), [i])
    )
  );
}

export async function councilMembers(): Promise<Hex[]> {
  return Promise.all(
    range(12).map(async (i) =>
      l1Rpc.contractRead(await councilAddress(), "members", scAbi.raw, z.any(), [i])
    )
  );
}

export type UserRole = z.infer<typeof UserRole>;

export async function getUserAuthRole(address: Hex): Promise<UserRole> {
  const [guardianAddresses, scAddresses] = await Promise.all([guardianMembers(), councilMembers()]);

  if (guardianAddresses.includes(address)) {
    return UserRole.enum.guardian;
  }

  if (scAddresses.includes(address)) {
    return UserRole.enum.securityCouncil;
  }

  return UserRole.enum.visitor;
}
