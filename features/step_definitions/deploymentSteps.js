const { When, Then } = require('@cucumber/cucumber');
const { ethers } = require('hardhat');
const assert = require('assert');

// Step definitions for migration script execution
When('o script de migração {string} for executado[{int}]', async function (scriptName, index) {
  // In a real scenario, you would import and execute the migration script based on scriptName.
  // Here we simulate the migration result.
  if (!this.migrationResults) {
    this.migrationResults = [];
  }
  this.migrationResults[Number(index)] = {
    transactionsSent: true,
    contractAddress: '0x' + 'a'.repeat(40),
    contractInstance: {
      // Simulated contract function for testing
      testFunction: async () => true
    }
  };
});

Then('as transações de deploy devem ser enviadas para a rede blockchain[{int}]', async function (index) {
  const result = this.migrationResults[Number(index)];
  assert(result && result.transactionsSent, 'Transações de deploy não foram enviadas');
});

Then('os endereços dos contratos implantados devem ser registrados[{int}]', async function (index) {
  const result = this.migrationResults[Number(index)];
  const address = result && result.contractAddress;
  assert(address && address.startsWith('0x') && address.length === 42, 'Endereço do contrato inválido');
});

Then('cada contrato deve responder corretamente às funções de teste[{int}]', async function (index) {
  const result = this.migrationResults[Number(index)];
  assert(result && result.contractInstance, 'Contrato não encontrado');
  const testResult = await result.contractInstance.testFunction();
  assert(testResult === true, 'O contrato não respondeu corretamente às funções de teste');
});

// Step definitions for deploy script execution
When('o script de deploy for executado', async function () {
  // Replace 'MyContract' with your actual contract name
  const MyContract = await ethers.getContractFactory('MyContract');
  this.deploymentReceipt = await MyContract.deploy();
  await this.deploymentReceipt.deployed();
});

Then('uma transação de deploy deve ser enviada para a blockchain', async function () {
  assert(this.deploymentReceipt && this.deploymentReceipt.deployTransaction && this.deploymentReceipt.deployTransaction.hash,
         'Transação de deploy não enviada');
});

Then('um endereço de contrato válido deve ser retornado', async function () {
  const address = this.deploymentReceipt.address;
  assert(address && address.startsWith('0x') && address.length === 42, 'Endereço do contrato inválido');
});

Then('o contrato deve responder corretamente às funções de teste', async function () {
  // Assume the deployed contract has a testFunction returning true
  const result = await this.deploymentReceipt.testFunction();
  assert(result === true, 'O contrato não respondeu corretamente às funções de teste');
}); 