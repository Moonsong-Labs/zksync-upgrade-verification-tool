import type { BlockExplorerClient } from "./block-explorer-client.js";
import type { ContractData } from "./contract-data.js";

export class VerifierContract {
  address: string;
  recursionCircuitsSetVksHash: string;
  recursionLeafLevelVkHash: string;
  recursionNodeLevelVkHash: string;

  constructor(
    address: string,
    recursionCircuitsSetVksHash: string,
    recursionLeafLevelVkHash: string,
    recursionNodeLevelVkHash: string
  ) {
    this.address = address;
    this.recursionCircuitsSetVksHash = recursionCircuitsSetVksHash;
    this.recursionLeafLevelVkHash = recursionLeafLevelVkHash;
    this.recursionNodeLevelVkHash = recursionNodeLevelVkHash;
  }

  async getCode(client: BlockExplorerClient): Promise<ContractData> {
    return client.getSourceCode(this.address);
  }
}
