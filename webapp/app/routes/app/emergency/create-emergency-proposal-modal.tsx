import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { action } from "@/routes/app/emergency/_route";
import { zodResolver } from "@hookform/resolvers/zod";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useFetcher } from "@remix-run/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { isAddress } from "viem";
import { z } from "zod";

export const emergencyPropSchema = z.object({
  title: z.string().min(1, "Title is required"),
  targetAddress: z.string().refine((value) => isAddress(value), {
    message: "Invalid Ethereum address",
  }),
  calls: z
    .string()
    .regex(/^0x[a-fA-F0-9]*$/, "Calls must be a hex string starting with 0x")
    .refine((value) => value.length % 2 === 0, {
      message: "Calls must be valid hex-encoded bytes",
    }),
  value: z
    .string()
    .regex(/^\d*\.?\d*$/, "Value must be a positive number")
    .refine((value) => Number.parseFloat(value) >= 0, {
      message: "Value must be a positive number",
    }),
  proposer: z
    .string()
    .refine((value) => isAddress(value), {
      message: "Invalid proposer address",
    })
    .optional(),
});

export type EmergencyProp = z.infer<typeof emergencyPropSchema>;

export function CreateEmergencyProposalModal({
  isOpen,
  errors,
  status,
  onClose,
  proposerAddress,
}: {
  isOpen: boolean;
  onClose: () => void;
  errors: object;
  status?: string;
  proposerAddress?: `0x${string}`;
}) {
  const [step, setStep] = useState(1);
  const fetcher = useFetcher<typeof action>();

  const form = useForm<EmergencyProp>({
    resolver: zodResolver(emergencyPropSchema),
    defaultValues: {
      title: "",
      targetAddress: "0x",
      calls: "0x",
      value: "0",
    },
  });

  const handleCreate = (data: EmergencyProp) => {
    if (form.formState.isValid) {
      console.log("Creating emergency proposal:", data);
      fetcher.submit({ ...data, proposer: proposerAddress ?? "" }, { method: "post" });
      onClose();
    }
  };

  const handleVerify = () => {
    if (form.formState.isValid) {
      setStep(2);
    } else {
      form.trigger();
    }
  };

  const handleBack = () => {
    setStep(1);
    form.clearErrors();
    form.reset(form.getValues());
  };

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader className="flex flex-row items-center justify-between">
          <AlertDialogTitle>Create Emergency Upgrade Proposal</AlertDialogTitle>
          {step === 1 && (
            <Button variant="ghost" size="icon" onClick={onClose} className="h-4 w-4 p-0">
              <Cross2Icon className="h-4 w-4" />
            </Button>
          )}
        </AlertDialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCreate)}>
            {step === 1 ? (
              <>
                <div className="grid gap-4 py-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="..." {...field} />
                        </FormControl>
                        <FormDescription>
                          This is to help voters identify which proposal this is.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="targetAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Target address</FormLabel>
                        <FormControl>
                          <Input placeholder="0x..." {...field} />
                        </FormControl>
                        <FormDescription>
                          {" "}
                          The address to which the call will be made.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="calls"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Calls</FormLabel>
                        <FormControl>
                          <Textarea placeholder="0x..." {...field} />
                        </FormControl>
                        <FormDescription>
                          The encoded calls to be executed on the `target` address.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="value"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Value</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input placeholder="0" {...field} className="pr-12" />
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                              ETH
                            </span>
                          </div>
                        </FormControl>
                        <FormDescription>
                          The amount of Ether to be sent along with the call.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <AlertDialogFooter>
                  <Button type="button" onClick={handleVerify}>
                    Verify
                  </Button>
                </AlertDialogFooter>
              </>
            ) : (
              <>
                <div className="py-4">
                  <h3 className="mb-4 font-semibold">Proposal Details</h3>
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium">Title:</span> {form.getValues("title")}
                    </p>
                    <p>
                      <span className="font-medium">Target Address:</span>{" "}
                      {form.getValues("targetAddress")}
                    </p>
                    <p>
                      <span className="font-medium">Calls:</span> {form.getValues("calls")}
                    </p>
                    <p>
                      <span className="font-medium">Value:</span> {form.getValues("value")} eth
                    </p>
                  </div>
                </div>
                <AlertDialogFooter>
                  <Button type="button" variant="outline" onClick={handleBack}>
                    Back
                  </Button>
                  <Button type="submit">Create</Button>
                </AlertDialogFooter>
              </>
            )}
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}