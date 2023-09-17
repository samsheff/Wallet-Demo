# Lambda Wallet

Lambda Wallet is a demo wallet chrome extension on manfest v3 that injects a metamask-like provider. It has conflict resolution for multiple providers and supports basic RPC commands. The extension is written in Node.js and React.

## Prerequisites

Before proceeding with the installation, ensure you have the following software installed on your machine:

- Node.js: [https://nodejs.org](https://nodejs.org)
- Yarn: [https://yarnpkg.com](https://yarnpkg.com)
- Google Chrome Browser: [https://www.google.com/chrome](https://www.google.com/chrome)

## Installation Steps

1. Clone the repository:
   ```
   git clone https://github.com/samsheff/Wallet-Demo
   ```

2. Navigate to the project directory:
   ```
   cd Wallet-Demo
   ```

3. Install project dependencies using Yarn:
   ```
   yarn install
   ```

4. Build the Chrome extension:
   ```
   yarn run dev
   ```

## Installing the Extension

1. Open Google Chrome and navigate to `chrome://extensions` in the address bar.

2. Enable **Developer Mode** by toggling the switch in the top-right corner of the page.

3. Click on the **Load unpacked** button and browse to the `dist` folder in the project directory.

4. Select the `dist` folder and click **Open**. The Chrome extension will be installed.

## Resetting the Wallet Settings and Seed Phrase

1. Open Google Chrome and navigate to `chrome://extensions` in the address bar.

2. Click on the Extension in the list and then on **Extension Options**

4. Click on the **Reset Wallet Data** button to reset the wallet associated with the extension.
