require('dotenv').config();
require("@nomiclabs/hardhat-ethers");

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 1337,
    },
    polygon_amoy: {
      url: process.env.POLYGON_RPC_URL || "https://rpc-amoy.polygon.technology",
      accounts: process.env.PRIVATE_KEY?.length === 64 
        ? [process.env.PRIVATE_KEY] 
        : [],
    },
  },
  solidity: {
    version: "0.8.20",
    settings: {
      evmVersion: "paris", // Adicionado para compatibilidade com PUSH0
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  paths: {
    sources: "./contracts",
    cache: "./cache",
    artifacts: "./artifacts"
  }
};
