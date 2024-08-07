import { bytea } from "@/.server/db/custom-types";
import { emergencyProposalStatusSchema } from "@/common/proposal-status";
import { signActionSchema } from "@/common/sign-action";
import { sql } from "drizzle-orm";
import {
  bigint,
  check,
  index,
  json,
  pgTable,
  serial,
  text,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";

export const proposalsTable = pgTable(
  "proposals",
  {
    id: serial("id").primaryKey(),
    externalId: bytea("external_id").notNull().unique(),
    calldata: bytea("calldata").notNull(),
    checkReport: json("check_report"),
    storageDiffReport: json("storage_diff_report"),
    proposedOn: timestamp("proposed_on", { withTimezone: true }).notNull(),
    executor: bytea("executor").notNull(),
    transactionHash: bytea("transaction_hash").notNull(),
  },
  (table) => ({
    externalIdIdx: index("external_id_idx").on(table.externalId),
  })
);

export const emergencyProposalsTable = pgTable(
  "emergency_proposals",
  {
    id: serial("id").primaryKey(),
    proposedOn: timestamp("proposed_on", { withTimezone: true }).notNull(),
    changedOn: timestamp("changed_on", { withTimezone: true }).notNull(),
    externalId: bytea("external_id").notNull().unique(),
    title: text("title").notNull(),
    targetAddress: bytea("target_address").notNull(),
    calldata: bytea("calldata").notNull(),
    salt: bytea("salt").notNull(),
    status: text("status", {
      enum: emergencyProposalStatusSchema.options,
    }).notNull(),
    value: bigint("value", { mode: "number" }).notNull(),
    proposer: bytea("proposer").notNull(),
    storageDiffReport: json("storage_diff_report"),
    checkReport: json("check_report"),
  },
  (table) => ({
    externalIdIdx: index("emergency_external_id_idx").on(table.externalId),
  })
);

export const signaturesTable = pgTable(
  "signatures",
  {
    id: serial("id").primaryKey(),
    proposal: bytea("proposal_id").references(() => proposalsTable.externalId),
    emergencyProposal: bytea("emergency_proposal_id").references(
      () => emergencyProposalsTable.externalId
    ),
    signer: bytea("signer").notNull(),
    signature: bytea("signature").notNull(),
    action: text("action", {
      enum: signActionSchema.options,
    }).notNull(),
  },
  ({ proposal, signer, action }) => ({
    uniqueSigner: unique().on(proposal, signer, action),
    proposalCheck: check(
      "mutual_exclusivity",
      sql`((proposal_id IS NOT NULL AND emergency_proposal_id IS NULL) OR 
           (proposal_id IS NULL AND emergency_proposal_id IS NOT NULL))`
    ),
  })
);
