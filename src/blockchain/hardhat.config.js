require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("@nomicfoundation/hardhat-verify");

/** 
 * @type import('hardhat/config').HardhatUserConfig 
 */
module.exports = {
  defaultNetwork: "polygon_amoy",
  networks: {
    hardhat: {
      chainId: 1337, // Define um chainId padrão para a rede Hardhat
    },
    polygon_amoy: {
      url: process.env.POLYGON_RPC_URL || "https://rpc-amoy.polygon.technology", // URL da RPC
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [], // Verifica se a chave privada está configurada
    },
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY || "", // Chave da API do Polygonscan
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200, // Configuração de otimização para reduzir custos de gás
      },
    },
  },
};
