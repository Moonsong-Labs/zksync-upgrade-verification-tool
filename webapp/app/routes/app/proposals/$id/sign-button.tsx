import { Button } from "@/components/ui/button";
import type { action } from "@/routes/app/proposals/$id/_route";
import { useFetcher } from "@remix-run/react";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import type { Hex } from "viem";
import { useChains, useSignTypedData } from "wagmi";

type ContractData = {
  name: string;
  address: Hex;
  actionName: string;
};

type SignButtonProps = {
  proposalId: Hex;
  contractData: ContractData;
  children?: React.ReactNode;
  disabled?: boolean;
};

export default function SignButton({
  children,
  proposalId,
  contractData,
  disabled,
}: SignButtonProps) {
  const { signTypedData, isPending, isSuccess, isError, data: signature } = useSignTypedData();
  const [chain] = useChains();
  const fetcher = useFetcher<typeof action>();

  useEffect(() => {
    if (isSuccess) {
      fetcher.submit(
        { signature, actionName: contractData.actionName, proposalId },
        { method: "POST" }
      );
    }
  }, [isSuccess, contractData.actionName, fetcher.submit, proposalId, signature]);

  const loading = isPending || fetcher.state === "submitting" || fetcher.state === "loading";
  const success = isSuccess && fetcher.state === "idle" && fetcher.data?.ok;
  const error = isError;

  useEffect(() => {
    if (loading) {
      toast.loading("Signing...", { id: "sign_button" });
    }
    if (success) {
      toast.success("Signed successfully", { id: "sign_button" });
    }
    if (error) {
      toast.error("Failed to sign", { id: "sign_button" });
    }
  }, [loading, success, error]);

  function onClick() {
    signTypedData({
      domain: {
        name: contractData.name,
        version: "1",
        chainId: chain.id,
        verifyingContract: contractData.address,
      },
      primaryType: contractData.actionName,
      message: {
        id: proposalId,
      },
      types: {
        [contractData.actionName]: [
          {
            name: "id",
            type: "bytes32",
          },
        ],
      },
    });
  }

  return (
    <Button loading={loading} disabled={disabled} onClick={onClick}>
      {children}
    </Button>
  );
}
