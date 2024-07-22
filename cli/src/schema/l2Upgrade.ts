import { z } from "zod";
import { hashString, bytes32Hash } from "../schema";

const systemContracts = z.array(
  z.object({
    name: z.string(),
    bytecodeHashes: z.array(bytes32Hash),
    address: hashString
  })
);

export const l2UpgradeSchema = z.object({
  systemContracts,
});

export type L2UpgradeJson = z.infer<typeof l2UpgradeSchema>;
