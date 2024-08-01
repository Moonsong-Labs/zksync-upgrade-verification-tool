import { getEmergencyProposalByExternalId } from "@/.server/db/dto/emergencyProposals";
import { getSignaturesByEmergencyProposalId } from "@/.server/db/dto/signatures";
import { actionSchema } from "@/.server/db/schema";
import {
  councilMembers,
  emergencyBoardAddress,
  guardianMembers,
  zkFoundationAddress,
} from "@/.server/service/authorized-users";
import { saveEmergencySignature } from "@/.server/service/signatures";
import { StatusIndicator } from "@/components/status-indicator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { displayBytes32 } from "@/routes/app/proposals/$id/common-tables";
import SignButton from "@/routes/app/proposals/$id/sign-button";
import { requireUserFromHeader } from "@/utils/auth-headers";
import { badRequest, notFound } from "@/utils/http";
import { type ActionFunctionArgs, type LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { ArrowLeft } from "lucide-react";
import { getFormData, getParams } from "remix-params-helper";
import { $path } from "remix-routes";
import { zodHex } from "validate-cli";
import { type Hex, isAddressEqual } from "viem";
import { z } from "zod";

export async function loader(args: LoaderFunctionArgs) {
  const user = requireUserFromHeader(args.request);
  const params = getParams(args.params, z.object({ id: zodHex }));
  if (!params.success) {
    throw notFound();
  }

  const { id: proposalId } = params.data;

  const boardAddress = await emergencyBoardAddress();

  const proposal = await getEmergencyProposalByExternalId(proposalId);

  if (proposal === undefined) {
    throw notFound();
  }

  const signatures = await getSignaturesByEmergencyProposalId(proposal.externalId);

  return json({
    proposal: {
      title: proposal?.title,
      externalId: proposal.externalId,
      proposedOn: proposal.proposedOn,
    },
    addresses: {
      emergencyBoard: boardAddress,
      zkFoundation: await zkFoundationAddress(),
    },
    user,
    signatures,
    allGuardians: await guardianMembers(),
    allSecurityCouncil: await councilMembers(),
  });
}

export async function action({ request }: ActionFunctionArgs) {
  const user = requireUserFromHeader(request);
  const formData = await getFormData(
    request,
    z.object({
      signature: zodHex,
      proposalId: zodHex,
      actionName: actionSchema,
    })
  );
  if (!formData.success) {
    throw badRequest("Failed to parse signature data");
  }
  const data = formData.data;

  await saveEmergencySignature(
    data.signature,
    user.address as Hex,
    data.actionName,
    data.proposalId
  );

  return json({ ok: true });
}

const ACTION_NAMES = {
  guardian: "ExecuteEmergencyUpgradeGuardians",
  securityCouncil: "ExecuteEmergencyUpgradeSecurityCouncil",
  zkFoundation: "ExecuteEmergencyUpgradeZKFoundation",
};

export default function EmergencyUpgradeDetails() {
  const navigate = useNavigate();

  const { user, proposal, addresses, signatures, allSecurityCouncil, allGuardians } =
    useLoaderData<typeof loader>();

  if (user.role === "visitor") {
    return "Unauthorized: Only valid signers can see this page.";
  }

  const actionName = ACTION_NAMES[user.role];
  const GUARDIAN_THRESHOLD = 5;
  const SC_THRESHOLD = 9;
  const haveAlreadySigned = signatures.some((s) => isAddressEqual(s.signer, user.address as Hex));
  const gatheredScSignatures = signatures.filter((sig) => {
    return allSecurityCouncil.some((addr) => isAddressEqual(addr, sig.signer));
  }).length;
  const gatheredGuardianSignatures = signatures.filter((sig) => {
    return allGuardians.some((addr) => isAddressEqual(addr, sig.signer));
  }).length;
  const ZK_FOUNDATION_THRESHOLD = 1;
  const gatheredZkFoundationSignatures = signatures.filter((s) =>
    isAddressEqual(s.signer, addresses.zkFoundation)
  ).length;
  return (
    <>
      <div className="mt-10 flex flex-1 flex-col">
        <div className="mb-4 flex items-center pl-2">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mr-2 hover:bg-transparent"
          >
            <ArrowLeft />
          </Button>
          <h2 className="font-semibold">
            Proposal{" "}
            {displayBytes32("0x967063a9ce441cdbf1ac4262f9d8152b96c6080144a1d5cb7b058dea70d01d02")}
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card className="pb-10">
          <CardHeader>
            <CardTitle>Proposal Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/*<div className="flex justify-between">*/}
              {/*  <span>Current Version:</span>*/}
              {/*  <span className="w-1/2 break-words text-right">current version</span>*/}
              {/*</div>*/}
              {/*<div className="flex justify-between">*/}
              {/*  <span>Proposed Version:</span>*/}
              {/*  <span className="w-1/2 break-words text-right">new version</span>*/}
              {/*</div>*/}
              <div className="flex justify-between">
                <span>Title:</span>
                <span className="w-4/5 justify-end break-words text-right">{proposal.title}</span>
              </div>
              <div className="flex justify-between">
                <span>Proposal ID:</span>
                <span className="w-4/5 justify-end break-words text-right">
                  {proposal.externalId}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Proposed On:</span>
                <div className="flex w-3/4 flex-col break-words text-right">
                  <span>{new Date(proposal.proposedOn).toLocaleDateString()}</span>
                  <span>{new Date(proposal.proposedOn).toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="pb-10">
          <CardHeader className="pt-7">
            <CardTitle>Proposal Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              <StatusIndicator
                label="Security Council Approvals"
                signatures={gatheredScSignatures}
                necessarySignatures={SC_THRESHOLD}
              />
              <StatusIndicator
                label="Guardian Approvals"
                signatures={gatheredGuardianSignatures}
                necessarySignatures={GUARDIAN_THRESHOLD}
              />
              <StatusIndicator
                label="ZkFoundation approvals"
                signatures={gatheredZkFoundationSignatures}
                necessarySignatures={ZK_FOUNDATION_THRESHOLD}
              />
            </div>
          </CardContent>
        </Card>
        <Card className="pb-10">
          <CardHeader>
            <CardTitle>Signatures</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col space-y-3">
            <SignButton
              proposalId={proposal.externalId}
              contractData={{
                actionName: actionName,
                address: addresses.emergencyBoard,
                name: "EmergencyUpgradeBoard",
              }}
              disabled={haveAlreadySigned}
              postAction={$path("/app/emergency/:id", { id: proposal.externalId })}
            >
              Approve
            </SignButton>
          </CardContent>
        </Card>
        <Card className="pb-10">
          <CardHeader>
            <CardTitle>Broadcast actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col space-y-3">
            <Button>Execute upgrade (wip)</Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
