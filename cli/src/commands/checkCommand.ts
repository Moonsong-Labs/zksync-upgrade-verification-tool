import type {Network} from "../lib/index.js";
import {createDiff} from "../lib/create-diff.js";

export async function checkCommand (etherscanKey: string, network: Network, upgradeDirectory: string): Promise<void> {
  const { diff, l1Abis} = await createDiff(etherscanKey, network, upgradeDirectory)

  console.log(await diff.toCliReport(l1Abis, upgradeDirectory))
}