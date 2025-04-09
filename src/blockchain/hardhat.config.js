require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("@nomicfoundation/hardhat-verify");

module.exports = {
  defaultNetwork: "hardhat", // Define a rede local como padrão
  networks: {
    hardhat: {
      chainId: 1337, // Chain ID padrão para a Hardhat Network
    },
    localhost: {
      url: "http://127.0.0.1:8545", // URL do nó local
      chainId: 1337, // Certifique-se de que o Chain ID seja consistente
    },
    polygon_amoy: {
      url: process.env.POLYGON_RPC_URL || "https://rpc-amoy.polygon.technology",
      accounts: process.env.PRIVATE_KEY && process.env.PRIVATE_KEY.length === 64 
        ? [process.env.PRIVATE_KEY] 
        : (() => { throw new Error("PRIVATE_KEY inválida ou não configurada corretamente."); })(),
    },
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY || "",
  },
  solidity: {
    compilers: [
      {
        version: "0.8.20", // Adiciona suporte à versão usada nos contratos
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  paths: {
    sources: "./contracts", // Caminho para os contratos Solidity
    tests: "./tests",       // Caminho para os testes
    cache: "./cache",       // Caminho para o cache
    artifacts: "./artifacts" // Caminho para os artefatos compilados
  }
};
