// require('babel-register')
// require('babel-polyfill')
require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");
const infuraKey = "";

const fs = require("fs");
const mnemonic = fs.readFileSync(".secret").toString().trim();
module.exports = {
  // Configure networks (Localhost, Rinkeby, etc.)
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*", // Match any network id
    },
    goerli: {
      provider: () =>
        new HDWalletProvider(mnemonic, `infura link/${infuraKey}`),
      network_id: 3, //add right one,
      gas: 5500000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
  },
  contracts_directory: "./src/contracts/",
  contracts_build_directory: "./src/abis/",
  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.11",
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
