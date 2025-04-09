# Contratos Blockchain do Nrisimhadeva

Este diretório contém os contratos inteligentes para o projeto Nrisimhadeva.

## Contratos Disponíveis

- **NrisimhadevaOracle.sol**: Contrato Oracle que permite ao proprietário atualizar um valor; registra a última atualização com um timestamp e emite um evento a cada atualização.
- **NrisimhadevaToken.sol**: Token ERC20 com controle de acesso. Possui funcionalidades para emissão de tokens, transferência entre contas e resgate de tokens através de uma chave PIX.

## Dependências

- Solidity ^0.8.0
- [OpenZeppelin Contracts](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Hardhat](https://hardhat.org/)
- [Cucumber.js](https://github.com/cucumber/cucumber-js) para testes de comportamento (BDD)

## Testes

Os testes de comportamento para o contrato NrisimhadevaToken são definidos utilizando Cucumber.

Para executar os testes, utilize o seguinte comando:

```bash
npx cucumber-js src/blockchain/contracts/NrisimhadevaToken.feature
```

Certifique-se de que a blockchain de teste esteja ativa e que todas as dependências estejam instaladas.

## Estrutura do Projeto

- `src/blockchain/contracts`: Diretório contendo os contratos inteligentes e arquivos de teste.
  - **NrisimhadevaOracle.sol**: Contrato Oracle para atualizações de valores.
  - **NrisimhadevaToken.sol**: Contrato Token com funcionalidades de emissão, transferência e resgate via PIX.
  - **NrisimhadevaToken.feature**: Arquivo de especificação de comportamento (BDD) para o contrato token.
  - **NrisimhadevaToken.steps.js**: Definições dos passos para os testes utilizando Cucumber.

## Implantação e Uso

1. Compile os contratos:
   ```bash
   npx hardhat compile
   ```
2. Implante os contratos na rede desejada:
   ```bash
   npx hardhat run scripts/deploy.js --network <network_name>
   ```
3. Interaja com os contratos utilizando scripts ou a interface do seu DApp.

## Contribuição

Contribuições são bem-vindas. Sinta-se à vontade para abrir issues ou pull requests.