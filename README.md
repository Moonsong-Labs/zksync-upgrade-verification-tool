![CoverImage](zkSyncEraUpgradeToolCover.png)


# 🔍 zkSync Era Upgrade Verification Tool 

The zkSync Era Upgrade Verification Tool is a **CLI tool crafted to decode and present zkSync Era upgrade proposals in a human-readable format**.

<br>

## 🌟 **Features**

 > 🏗️ `Work In Progress` : This repo is being actively developed and does not represent final quality of the tool!

  - **_[L1]_ Facets**: Identifies contract upgrades including additions or removals of functions. 
  - **_[L1]_ Verifier** : Detects upgrades and parameter changes in contracts.
  - **_[L2]_ System Contracts**: Lists changes and validates bytecode hashes. 
 - **_[L2]_ Bootloader and DefaultAccount**: Validates bytecode hash.
 - **Solidity Diff Tool**: Compares current contracts with upgrade proposals for verification. *Currently available for Facets, Verifier & System Contracts.*

<br>

## 🔍 **Prerequisites**

### **1. Node.js, pnpm & yarn**

```bash
node --version  # Checks the installed version of Node.js
pnpm --version  # Checks the installed version of pnpm
yarn --version  # Checks the installed version of yarn
```

If you do not have Node.js installed, please install it from [nodejs.org](https://nodejs.org/en/download/package-manager). For example: 

```bash
brew install node
```

If you do not have `pnpm` installed, please install it from [pnpm installation guide](https://pnpm.io/installation). For example:

```bash
npm install -g pnpm
```

If you do not have `yarn` installed, please install it from [yarn installation guide](https://classic.yarnpkg.com/en/docs/install). For example:

```bash
npm install -g yarn
```

### **2. Access to Upgrade Directory**

For the `<upgradeDir>` parameter, you need access to a upgrade directory. For example, [zksync-era upgrades directory](https://github.com/matter-labs/zksync-era/tree/main/etc/upgrades)

You can clone [zkSync Era Repo](https://github.com/matter-labs/zksync-era) to access this directory: 

```bash
git clone https://github.com/matter-labs/zksync-era.git
```

Later you can define the target `<upgradeDir>` in tool commands using the path to a specific upgrade, for example:

```bash
path-to-directory/zksync-era/etc/upgrades/1699353977-boojum
```

## 🏃 **Set up**

### **1. Clone repository**

```bash
git clone https://github.com/Moonsong-Labs/era-l1-upgrade-checker.git && cd era-l1-upgrade-checker
```

### **2. Install dependencies & build**

```bash
pnpm install
```

```bash
pnpm build
```

### **3. Etherscan Key setup**
<br>

>You can create an Etherscan API key at [Etherscan API Key](https://docs.etherscan.io/getting-started/viewing-api-usage-statistics).

<br>

#### ***Option 1: Environment Variables***

```bash
export ETHERSCAN_API_KEY="<your_etherscan_api_key>"
```

#### ***Option 2: Configuration Files***

Alternatively, you can copy  env.example file and complete it with your keys:

```bash
cp env.example .env
```
This file should contain the following entries:
```bash
# .env
ETHERSCAN_API_KEY=your_etherscan_api_key
```

#### ***Option 3: CLI Argument***

 You can also specify your API keys directly as command line arguments when running commands that require them. For example:

```bash
pnpm validate --ethscanApiKey=your_etherscan_api_key
```

## 🛠️ **Usage**
The zkSync Era Upgrade Verification Tool provides a range of commands for interacting with and verifying zkSync protocol upgrade data.

>**Etherscan API Key required.*

### **`check <upgradeDir>`**: 
Checks the validity of the upgrade and prints a summary of the changes.

```bash
pnpm validate check <upgradeDir>
```

```bash
pnpm validate check ../zksync-era/etc/upgrades/1699353977-boojum #Example of check command with Boojum upgrade.
```

<br>

### **`facet-diff <upgradeDir> <facetName>`**: 
Shows the proposed changes in a specified facet.


```bash
pnpm validate show-diff <upgradeDir> <facetName>
```

```bash
pnpm validate facet-diff ../zksync-era/etc/upgrades/1699353977-boojum GettersFacet --ref=e77971dba8f589b625e72e69dd7e33ccbe697cc0 #Example with GettersFacet in Boojum upgrade with specific commit reference.
```
<br>

### **`verifier-diff <upgradeDir>`**: 
Shows the proposed changes between current verifier source code and the proposed one.

```bash
pnpm validate verifier-diff <upgradeDir>
```
```bash
pnpm validate verifier-diff ../zksync-era/etc/upgrades/1699353977-boojum #Example of verifier-diff command for Boojum upgrade.
``` 

<br>

### **`download-diff <upgradeDir> <targetSourceCodeDir>`** :
Downloads both the current and proposed versions of each contract being upgraded for comparison.

1. **Run the Command:**
    ```bash
      pnpm validate download-diff <upgradeDir> <targetSourceCodeDir>
    ```
    `<targetSourceCodeDir>`: The directory where you wish to save the downloaded differences.

   *Note: Depending on the specific upgrade referenced, the `--ref` option might be necessary. For more info, please refer to [--ref in options section.](#🎛️-options)*   


2. **Navigate to Directory:** After running the command, navigate to the `<targetSourceCodeDir>` directory.

<br>

3. **Use Your Preferred Diff Tool:** Once in the `<targetSourceCodeDir>`, you can use your preferred diff tool to compare the 'old' (*current*) versus 'new'  (*upgrade*) directory structure or specific files.
    - *For example:* 
        - ```diff -r old new```
        - ```meld old new```
        - ```vimdiff old new```

<br>

## 🎛️ **Options**

The following options are available to configure the zkSync Era Upgrade Verification Tool:

### `-n`, `--network`
Specifies the target network where the tool will perform the checks. 
- **Values**: `mainnet`, `sepolia`
- **Default**: `mainnet`
- **Example**: *Protodanksharding upgrade in sepolia*

```bash
pnpm validate check ../zksync-era/etc/upgrades/1709067445-protodanksharding --network=sepolia
```

###  `--rpc` , `--rpcUrl`
Specifies the Ethereum RPC URL to be used for connecting to the blockchain.
- **Default**:
  - `mainnet`: `https://ethereum-rpc.publicnode.com`
  - `sepolia`: `https://ethereum-sepolia-rpc.publicnode.com`

### `--ref`
Specifies the GitHub commit reference from which the L2 code will be downloaded.
- **Default**: The last commit on the `main` branch.
- **Example**: `--ref` to commit (related to `boojum` upgrade in `download_dif` command).

  ```bash
  pnpm validate download-diff ../zksync-era/etc/upgrades/1699353977-boojum boojumDiff --ref=e77971dba8f589b625e72e69dd7e33ccbe697cc0
  ```


## ❓ **Help**

**`help`**: Provides usage information and displays help for all commands.

```bash
pnpm validate help
```

## 🧪 **Testing**

Unit tests are located inside the cli package. To run:

```bash
pnpm run --filter=./cli test
```

Integration tests are inside "test" package. In order to run them
it's important to config api keys for testing. That can be done with
a dotenv file inside the test directory:

``` bash
cp env.example test/.env
vim .env # complete with real api keys
```

Once it's completed you can run the integration tests with:

``` test
pnpm run --filter=./test test
```

Lastly, this command will execute all automated tests associated with the tool:

```bash
pnpm test
```

## 🔮 **Future Improvements**

- **Extended Support for L2 Upgrades**: We plan to expand the capabilities of the Solidity Diff Tool to include Bootloader and DefaultAccount contracts.

- **Improve Error Handling**: We plan to improve error messages and handling throughout the tool.

- **Add HTML File Output Option**: Implementing HTML file output option to improve diff visualization and user experience. 

We welcome community feedback and suggestions which can be submitted via our GitHub repository.

## 📄 **License**

This project is licensed under the MIT License. For more details, see the LICENSE file in the repository.