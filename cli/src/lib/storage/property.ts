import type { MemoryDataType } from "./types/data-type";
import type { Option } from "nochoices";

import type { MemorySnapshot } from "./memory-snapshot";
import type { MemoryValue } from "./values/memory-value";

export class Property {
  name: string;
  slot: bigint;
  description: string;
  type: MemoryDataType;
  private offset: number;

  constructor(name: string, slot: bigint, description: string, type: MemoryDataType, offset = 0) {
    this.name = name;
    this.slot = slot;
    this.description = description;
    this.type = type;
    this.offset = offset;
  }

  extract(memory: MemorySnapshot): Option<MemoryValue> {
    return this.type.extract(memory, this.slot, this.offset);
  }
}