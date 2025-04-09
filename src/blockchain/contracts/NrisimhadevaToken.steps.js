const { Before, Given, When, Then } = require('@cucumber/cucumber');
const { ethers } = require('hardhat');
const { expect } = require('chai');

let token;
let owner, A, B, spender, C;

Before(async function () {
    const Token = await ethers.getContractFactory("NrisimhadevaToken");
    token = await Token.deploy();
    await token.deployed();
    const signers = await ethers.getSigners();
    [owner, A, B, spender, C] = signers.slice(0,5);
});

Given('que a rede blockchain esteja ativa e conectada', async function () {});

Given('que o contrato NrisimhadevaToken tenha sido implantado na rede', async function () {});

Given('que o contrato foi inicializado com um total de {int} tokens', async function (initialTokens) {
    const totalSupply = await token.totalSupply();
    const expectedSupply = ethers.utils.parseUnits(initialTokens.toString(), await token.decimals());
    expect(totalSupply.toString()).to.equal(expectedSupply.toString());
});

When('consulto o total de tokens do contrato', async function () {
    this.totalSupply = await token.totalSupply();
});

Then('o valor retornado deve ser {int} tokens', async function (expectedTokens) {
    const expectedSupply = ethers.utils.parseUnits(expectedTokens.toString(), await token.decimals());
    expect(this.totalSupply.toString()).to.equal(expectedSupply.toString());
});

Given('que a conta "A" possua {int} tokens', async function (amount) {
    await token.addOracle(owner.address);
    const tokens = ethers.utils.parseUnits(amount.toString(), await token.decimals());
    await token.issueTokens(A.address, amount, "tx1");
});

When('a conta "A" transferir {int} tokens para a conta "B"', async function (transferAmount) {
    const tokenForA = token.connect(A);
    const amount = ethers.utils.parseUnits(transferAmount.toString(), await token.decimals());
    await tokenForA.transfer(B.address, amount);
});

Then('o saldo da conta "A" deverá ser {int} tokens', async function (expectedBalance) {
    const balance = await token.balanceOf(A.address);
    const expected = ethers.utils.parseUnits(expectedBalance.toString(), await token.decimals());
    expect(balance.toString()).to.equal(expected.toString());
});

Then('o saldo da conta "B" deverá ser {int} tokens', async function (expectedBalance) {
    const balance = await token.balanceOf(B.address);
    const expected = ethers.utils.parseUnits(expectedBalance.toString(), await token.decimals());
    expect(balance.toString()).to.equal(expected.toString());
});

Given('que a conta "owner" possua {int} tokens', async function (amount) {
    await token.addOracle(owner.address);
    await token.issueTokens(owner.address, amount, "tx2");
    this.ownerInitialBalance = await token.balanceOf(owner.address);
});

When('a conta "owner" aprovar a conta "spender" para gastar {int} tokens', async function (approveAmount) {
    const amount = ethers.utils.parseUnits(approveAmount.toString(), await token.decimals());
    await token.approve(spender.address, amount);
});

When('a conta "spender" executar uma transferência de {int} tokens da conta "owner" para a conta "C" utilizando a função transferFrom', async function (transferAmount) {
    const tokenForSpender = token.connect(spender);
    const amount = ethers.utils.parseUnits(transferAmount.toString(), await token.decimals());
    await tokenForSpender.transferFrom(owner.address, C.address, amount);
});

Then('o saldo da conta "owner" deverá ser reduzido em {int} tokens', async function (reducedAmount) {
    const currentBalance = await token.balanceOf(owner.address);
    const expectedReduction = ethers.utils.parseUnits(reducedAmount.toString(), await token.decimals());
    expect(currentBalance.toString()).to.equal(this.ownerInitialBalance.sub(expectedReduction).toString());
});

Then('o saldo da conta "C" deverá ser aumentado em {int} tokens', async function (increasedAmount) {
    const balanceC = await token.balanceOf(C.address);
    const expected = ethers.utils.parseUnits(increasedAmount.toString(), await token.decimals());
    expect(balanceC.toString()).to.equal(expected.toString());
});

Then('a permissão da conta "spender" deverá ser zerada pós-transferência', async function () {
    const allowance = await token.allowance(owner.address, spender.address);
    expect(allowance.toString()).to.equal("0");
});
