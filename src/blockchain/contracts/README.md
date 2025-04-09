# Contratos Inteligentes Blockchain para Nrisimhadeva

Este diretório contém os contratos inteligentes do projeto Nrisimhadeva, permitindo a interação com a blockchain de forma transparente e segura.

## Contratos Disponíveis

- **NrisimhadevaOracle.sol**: Contrato Oracle que permite ao proprietário atualizar um valor, registrando a última atualização com um timestamp e emitindo um evento a cada nova atualização.
- **NrisimhadevaToken.sol**: Token ERC20 com controle de acesso, oferecendo funcionalidades para emissão, transferência entre contas e resgate de tokens via chave PIX.

## Dependências

- Solidity ^0.8.0
- [OpenZeppelin Contracts](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Hardhat](https://hardhat.org/)

## Testes

Os testes de comportamento dos contratos são definidos utilizando [Cucumber.js](https://github.com/cucumber/cucumber-js).

Para executar os testes, utilize o seguinte comando:
```bash
npx cucumber-js src/blockchain/contracts/NrisimhadevaToken.feature
```
Certifique-se de que a blockchain de teste esteja ativa e todas as dependências instaladas.

## Estrutura do Projeto

- `src/blockchain/contracts`: Diretório contendo os contratos inteligentes, arquivos de teste e scripts de implantação.
  - **NrisimhadevaOracle.sol**: Contrato Oracle para atualizações de valores.
  - **NrisimhadevaToken.sol**: Contrato Token com funcionalidades de emissão, transferência e resgate via PIX.
  - **NrisimhadevaToken.feature**: Especificação de comportamento (BDD) para o contrato token.
  - **NrisimhadevaToken.steps.js**: Definições dos passos para testes utilizando Cucumber.

## Compilação

Compile os contratos utilizando o seguinte comando:
```bash
npx hardhat compile
```

## Implantação

Para implantar os contratos na rede desejada, utilize o comando:
```bash
npx hardhat run scripts/deploy.js --network <network_name>
```
Substitua `<network_name>` pelo nome da rede (ex.: `rinkeby`, `mainnet` ou sua rede local).

## Interação e Uso

Após a implantação, você pode interagir com os contratos por meio de scripts ou da interface do seu DApp.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

## Informações Adicionais

- Certifique-se de que todas as dependências estejam instaladas antes de compilar ou implantar os contratos.
- Consulte a [documentação do Hardhat](https://hardhat.org/) para mais detalhes sobre configuração e uso.