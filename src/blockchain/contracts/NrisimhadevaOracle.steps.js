// src/blockchain/contracts/NrisimhadevaOracle.steps.js

const { expect } = require('chai');
const { ethers } = require('hardhat');
const { Given, When, Then } = require('@cucumber/cucumber');

Given('que um pagamento PIX de R${int} foi recebido para a chave {string}', async function (amount, pixKey) {
  this.paymentAmount = amount;
  this.pixKey = pixKey;
});

Given('o campo solicitacaoPagador contém o endereço {string}', async function (address) {
  this.recipientAddress = address;
});

When('o oráculo detecta a transação', async function () {
  const Oracle = await ethers.getContractFactory('NrisimhadevaOracle');
  this.oracle = await Oracle.deploy();
  
  const Token = await ethers.getContractFactory('NrisimhadevaToken');
  this.token = await Token.deploy();
  
  await this.oracle.processPIXPayment(
    this.recipientAddress,
    this.paymentAmount,
    ethers.utils.formatBytes32String('tx123')
  );
});

Then('o contrato deve emitir {int} tokens para {string}', async function (amount, address) {
  const balance = await this.token.balanceOf(address);
  expect(balance).to.equal(ethers.utils.parseUnits(amount.toString(), 18));
});

Then('o evento {string} deve ser emitido com os detalhes corretos', async function (eventName) {
  const eventFilter = this.token.filters[eventName]();
  const events = await this.token.queryFilter(eventFilter);
  
  expect(events.length).to.equal(1);
  expect(events[0].args.amount).to.equal(this.paymentAmount);
});

Given('que o endereço {string} possui {int} tokens', async function (address, amount) {
  await this.token.issueTokens(address, amount, 'initial');
});

Given('possui uma chave PIX {string} registrada', async function (pixKey) {
  await this.token.connect(this.signer).registerPixKey(pixKey);
});

When('o lojista inicia um resgate de {int} tokens', async function (amount) {
  await this.token.connect(this.signer).redeemTokens(amount);
});

Then('o oráculo deve iniciar uma transferência PIX de R${int} para {string}', async function (amount, pixKey) {
  const transferEvent = await new Promise(resolve => {
    this.oracle.on('PixPaymentProcessed', (sender, amount, key) => {
      resolve({ sender, amount, key });
    });
  });

  expect(transferEvent.amount).to.equal(amount);
  expect(transferEvent.key).to.equal(pixKey);
});
