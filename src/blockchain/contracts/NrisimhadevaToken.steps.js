const { Before, Given, When, Then } = require('@cucumber/cucumber');
const { ethers } = require('hardhat');
const { expect } = require('chai');

let token;
let owner, A, B, spender, C;

Before(async function () {
  // Deploy the NrisimhadevaToken contract before each scenario
  const Token = await ethers.getContractFactory("NrisimhadevaToken");
  token = await Token.deploy();
  await token.deployed();
  const signers = await ethers.getSigners();
  owner = signers[0];
  A = signers[1];
  B = signers[2];
  spender = signers[3];
  C = signers[4];
});

// Background: Blockchain connection
Given('que a rede blockchain esteja ativa e conectada', async function () {
  // Assume the blockchain network is active and connected
});

Given('que o contrato NrisimhadevaToken tenha sido implantado na rede', async function () {
  // The contract deployment is handled in the Before hook
});

Given('que o contrato foi inicializado com um total de {int} tokens', async function (initialTokens) {
  // Initialize the contract by minting tokens to the owner
  const decimals = await token.decimals();
  const totalSupply = ethers.utils.parseUnits(initialTokens.toString(), decimals);
  await token.addOracle(owner.address);
  await token.issueTokens(owner.address, totalSupply, "Initial supply");
});

When('consulto o total de tokens do contrato', async function () {
  this.totalSupply = await token.totalSupply();
});

Then('o valor retornado deve ser {int} tokens', async function (expectedTokens) {
  const decimals = await token.decimals();
  const expectedSupply = ethers.utils.parseUnits(expectedTokens.toString(), decimals);
  expect(this.totalSupply.toString()).to.equal(expectedSupply.toString());
});

// Scenario: Transferência de tokens entre contas
Given('que a conta "A" possua {int} tokens', async function (amount) {
  const decimals = await token.decimals();
  const totalAmount = ethers.utils.parseUnits(amount.toString(), decimals);
  await token.addOracle(owner.address);
  await token.issueTokens(A.address, totalAmount, "Assign tokens to A");
});

When('a conta "A" transferir {int} tokens para a conta "B"', async function (transferAmount) {
  const decimals = await token.decimals();
  const tokenForA = token.connect(A);
  await tokenForA.transfer(B.address, ethers.utils.parseUnits(transferAmount.toString(), decimals));
});

Then('o saldo da conta "A" deverá ser {int} tokens', async function (expectedBalance) {
  const decimals = await token.decimals();
  const balance = await token.balanceOf(A.address);
  const expected = ethers.utils.parseUnits(expectedBalance.toString(), decimals);
  expect(balance.toString()).to.equal(expected.toString());
});

Then('o saldo da conta "B" deverá ser {int} tokens', async function (expectedBalance) {
  const decimals = await token.decimals();
  const balance = await token.balanceOf(B.address);
  const expected = ethers.utils.parseUnits(expectedBalance.toString(), decimals);
  expect(balance.toString()).to.equal(expected.toString());
});

// Scenario: Aprovação e transferência delegada de tokens
Given('que a conta "owner" possua {int} tokens', async function (amount) {
  const decimals = await token.decimals();
  const totalAmount = ethers.utils.parseUnits(amount.toString(), decimals);
  await token.addOracle(owner.address);
  await token.issueTokens(owner.address, totalAmount, "Assign tokens to owner");
  this.ownerInitialBalance = totalAmount;
});

When('a conta "owner" aprovar a conta "spender" para gastar {int} tokens', async function (approveAmount) {
  const decimals = await token.decimals();
  await token.approve(spender.address, ethers.utils.parseUnits(approveAmount.toString(), decimals));
});

When('a conta "spender" executar uma transferência de {int} tokens da conta "owner" para a conta "C" utilizando a função transferFrom', async function (transferAmount) {
  const decimals = await token.decimals();
  const tokenForSpender = token.connect(spender);
  await tokenForSpender.transferFrom(owner.address, C.address, ethers.utils.parseUnits(transferAmount.toString(), decimals));
});

Then('o saldo da conta "owner" deverá ser reduzido em {int} tokens', async function (reducedAmount) {
  const decimals = await token.decimals();
  const expectedBalance = this.ownerInitialBalance.sub(ethers.utils.parseUnits(reducedAmount.toString(), decimals));
  const actualBalance = await token.balanceOf(owner.address);
  expect(actualBalance.toString()).to.equal(expectedBalance.toString());
});

Then('o saldo da conta "C" deverá ser aumentado em {int} tokens', async function (increasedAmount) {
  const decimals = await token.decimals();
  const balanceC = await token.balanceOf(C.address);
  const expectedBalanceC = ethers.utils.parseUnits(increasedAmount.toString(), decimals);
  expect(balanceC.toString()).to.equal(expectedBalanceC.toString());
});

Then('a permissão da conta "spender" deverá ser zerada pós-transferência', async function () {
  const allowanceSpender = await token.allowance(owner.address, spender.address);
  expect(allowanceSpender.toString()).to.equal("0");
});
