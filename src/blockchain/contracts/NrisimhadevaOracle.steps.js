// src/blockchain/contracts/NrisimimhadevaOracle.steps.js
const { expect } = require('chai');
const { ethers } = require('hardhat');
const { Given, When, Then, Before } = require('@cucumber/cucumber');

let tokenContract;
let oracleContract;
let owner, oracle, user, merchant;

Before(async function () {
  [owner, oracle, user, merchant] = await ethers.getSigners();

  // Deploy Token
  const Token = await ethers.getContractFactory('NrisimhadevaToken');
  tokenContract = await Token.deploy();
  await tokenContract.deployed();

  // Deploy Oracle
  const Oracle = await ethers.getContractFactory('NrisimhadevaOracle');
  oracleContract = await Oracle.deploy(
    tokenContract.address,
    ethers.constants.AddressZero, // Mock Chainlink token
    oracle.address, // Oracle address
    ethers.utils.formatBytes32String('mockJobId'),
    ethers.utils.parseEther('0.1')
  );
  await oracleContract.deployed();

  // Grant Oracle role
  await oracleContract.grantRole(await oracleContract.ORACLE_ROLE(), oracle.address);
});

Given('que um pagamento PIX de R${int} foi recebido para a chave {string}',
  async function (amount, pixKey) {
    // Simula recebimento via backend externo
  });

Given('o campo solicitacaoPagador contém o endereço {string}',
  async function (address) {
    this.recipientAddress = address;
  });

When('o oráculo detecta a transação', async function () {
  await oracleContract.connect(oracle).processPIXPayment(
    this.recipientAddress,
    ethers.utils.parseUnits(String(this.amount), 18),
    'tx123'
  );
});

Then('o contrato deve emitir {int} tokens para {string}',
  async function (amount, address) {
    const balance = await tokenContract.balanceOf(address);
    expect(balance).to.equal(ethers.utils.parseUnits(String(amount), 18));
  });

Then('o evento {string} deve ser emitido com os detalhes corretos',
  async function (eventName) {
    const eventFilter = oracleContract.filters.PixPaymentDetected();
    const events = await oracleContract.queryFilter(eventFilter);
    expect(events.length).to.be.greaterThan(0);
  });

// Steps para resgate de tokens
Given('que o endereço {string} possui {int} tokens',
  async function (address, amount) {
    await tokenContract.issueTokens(
      address,
      ethers.utils.parseUnits(String(amount), 18),
      'initial_issue'
    );
  });

Given('possui uma chave PIX {string} registrada',
  async function (pixKey) {
    this.pixKey = pixKey;
  });

When('o lojista inicia um resgate de {int} tokens',
  async function (amount) {
    this.initialBalance = await tokenContract.balanceOf(merchant.address);
    await oracleContract.connect(oracle).processRedemption(
      merchant.address,
      ethers.utils.parseUnits(String(amount), 18),
      this.pixKey
    );
  });

Then('o oráculo deve iniciar uma transferência PIX de R${int} para {string}',
  async function (amount, pixKey) {
    // Verifica se o evento foi emitido
    const eventFilter = oracleContract.filters.PixPaymentProcessed();
    const events = await oracleContract.queryFilter(eventFilter);
    expect(events[0].args.pixKey).to.equal(pixKey);
  });

Then('os tokens devem ser queimados', async function () {
  const finalBalance = await tokenContract.balanceOf(merchant.address);
  expect(finalBalance).to.be.lt(this.initialBalance);
});

// Steps para cenários de erro
When('o oráculo tenta processar a transação', async function () {
  this.tx = oracleContract.connect(oracle).processPIXPayment(
    user.address,
    0,
    'invalid_tx'
  );
});

Then('a transação deve ser revertida com o erro {string}',
  async function (errorMessage) {
    await expect(this.tx).to.be.revertedWith(errorMessage);
  });
