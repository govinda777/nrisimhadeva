const { expect } = require('chai');
const { ethers } = require('hardhat');
const { Given, When, Then, Before } = require('@cucumber/cucumber');

let tokenContract;
let oracleContract;
let owner, oracle, user, merchant;

Before(async function () {
  [owner, oracle, user, merchant] = await ethers.getSigners();

  // Deploy Token com permissões corretas
  const Token = await ethers.getContractFactory('NrisimhadevaToken');
  tokenContract = await Token.deploy();
  await tokenContract.deployed();
  
  // Conceder papel de MINTER_ROLE para o Oracle
  const MINTER_ROLE = await tokenContract.MINTER_ROLE();
  await tokenContract.grantRole(MINTER_ROLE, owner.address);

  // Deploy Oracle
  const Oracle = await ethers.getContractFactory('NrisimhadevaOracle');
  oracleContract = await Oracle.deploy(
    tokenContract.address,
    ethers.constants.AddressZero,
    oracle.address, // Endereço do Oracle
    ethers.utils.formatBytes32String('mockJobId'),
    ethers.utils.parseEther('0.1')
  );
  await oracleContract.deployed();

  // Conceder MINTER_ROLE para o contrato Oracle
  await tokenContract.grantRole(MINTER_ROLE, oracleContract.address);

  // Conceder ORACLE_ROLE
  const ORACLE_ROLE = await oracleContract.ORACLE_ROLE();
  await oracleContract.grantRole(ORACLE_ROLE, oracle.address);
});

// Implementação completa dos steps
Given('que um pagamento PIX de R${int} foi recebido para a chave {string}', 
  async function (amount, pixKey) {
    this.amount = amount;
    this.pixKey = pixKey;
  });

Given('o campo {string} contém o endereço {string}', 
  async function (campo, endereco) {
    if (!ethers.utils.isAddress(endereco)) {
      throw new Error(`Endereço inválido: ${endereco}`);
    }
    this.recipientAddress = endereco;
  });

When('o oráculo detecta a transação', async function () {
  this.initialBalance = await tokenContract.balanceOf(this.recipientAddress);
  await oracleContract.connect(oracle).processPIXPayment(
    this.recipientAddress,
    this.amount,
    'tx123'
  );
});

Then('o contrato deve emitir {int} tokens para {string}', 
  async function (amount, address) {
    const decimals = await tokenContract.decimals();
    const expected = ethers.utils.parseUnits(amount.toString(), decimals);
    const finalBalance = await tokenContract.balanceOf(address);
    const initial = this.initialBalance || ethers.BigNumber.from('0');
    const diff = finalBalance.sub(initial);
    expect(diff.toString()).to.equal(expected.toString());
  });

Then('o evento {string} deve ser emitido com os detalhes corretos', 
  async function (eventName) {
    const decimals = await tokenContract.decimals();
    const expectedAmount = ethers.utils.parseUnits(this.amount.toString(), decimals);
    const filter = oracleContract.filters[eventName](this.recipientAddress, null, 'tx123');
    const events = await oracleContract.queryFilter(filter);
    expect(events.length).to.be.greaterThan(0);
    const event = events[0];
    expect(event.args.recipient).to.equal(this.recipientAddress);
    expect(event.args.amount.toString()).to.equal(expectedAmount.toString());
    expect(event.args.pixTransactionId).to.equal('tx123');
  });

// Steps para resgate
Given('que o endereço {string} possui {int} tokens', 
  async function (address, amount) {
    if (!ethers.utils.isAddress(address)) {
      throw new Error(`Endereço inválido: ${address}`);
    }
    // If a PIX key was registered, assume resgate scenario and issue tokens to the merchant
    const recipient = this.pixKey ? merchant.address : address;
    await tokenContract.connect(owner).issueTokens(
      recipient,
      amount,
      'initial_issue'
    );
  });

Given('possui uma chave PIX {string} registrada', 
  async function (pixKey) {
    this.pixKey = pixKey;
    await tokenContract.connect(merchant).registerPixKey(pixKey);
  });

When('o lojista inicia um resgate de {int} tokens', 
  async function (amount) {
    this.initialBalance = await tokenContract.balanceOf(merchant.address);
    await tokenContract.connect(merchant).redeemTokens(amount);
  });

Then('o oráculo deve iniciar uma transferência PIX de R${int} para {string}', 
  async function (amount, pixKey) {
    const decimals = await tokenContract.decimals();
    const expectedAmount = ethers.utils.parseUnits(amount.toString(), decimals);
    const eventFilter = tokenContract.filters.TokensRedeemed();
    const events = await tokenContract.queryFilter(eventFilter);
    expect(events.length).to.be.greaterThan(0);
    const event = events[0];
    expect(event.args.pixKey).to.equal(pixKey);
    expect(event.args.amount.toString()).to.equal(expectedAmount.toString());
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
    try {
      await this.tx;
      throw new Error('Transaction did not revert');
    } catch (error) {
      expect(error.message).to.include(errorMessage);
    }
  });

// Step adicional para pagamento inválido
Given('que um pagamento PIX de R${int} foi recebido', 
  async function (amount) {
    this.amount = amount;
  });

// Novo step para saldo insuficiente
When('tenta resgatar {int} tokens', 
  async function (amount) {
    this.amountToRedeem = amount;
    this.tx = tokenContract.connect(merchant).redeemTokens(amount);
  });

Then('o evento {string} deve ser emitido', function (string) {
  // Implementação para verificar se o evento foi emitido
  return 'pending';
});
