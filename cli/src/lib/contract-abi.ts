import { type Abi, type AbiFunction, decodeFunctionData, type Hex, toFunctionSelector } from "viem";
import type { z } from "zod";

export class ContractAbi {
  raw: Abi;
  private selectors: Map<Hex, AbiFunction>;

  constructor(raw: Abi) {
    this.raw = raw;
    this.selectors = new Map();

    const fns = raw.filter((desc) => desc.type === "function") as AbiFunction[];
    for (const fn of fns) {
      const selector = toFunctionSelector(fn);
      this.selectors.set(selector, fn);
    }
  }

  allSelectors(): Hex[] {
    return [...this.selectors.keys()];
  }

  signatureForSelector(selector: Hex): string {
    const fn = this.selectors.get(selector);
    if (!fn) {
      return "unknown";
    }
    const params = fn.inputs.map((i) => `${i.type} ${i.name}`);
    return `${fn.name}(${params.join(", ")})`;
  }

  decodeCallData<T extends z.ZodTypeAny>(callData: Hex, schema: T): z.infer<typeof schema> {
    const raw = decodeFunctionData({
      data: callData,
      abi: this.raw,
    });
    return schema.parse(raw);
  }
}
