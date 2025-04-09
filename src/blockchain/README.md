# Blockchain Layer

Este diretório agrupa toda a lógica e os componentes que compõem a camada blockchain do protocolo descentralizado. Nele, encontram-se os smart contracts, scripts de migração, testes e deploy, os quais formam a base dos serviços blockchain da aplicação.

## Estrutura do Diretório

| Diretório      | Descrição                                                                                                         |
| -------------- | ----------------------------------------------------------------------------------------------------------------- |
| **contracts**  | Contém os smart contracts escritos em Solidity (por exemplo, `NrisimhadevaToken.sol` e `NrisimhadevaOracle.sol`).      |
| **migrations** | Scripts e arquivos de configuração para migrar e implantar os smart contracts (ex.: `1_deploy_contracts.js`).         |
| **scripts**    | Scripts auxiliares que automatizam o processo de deploy dos contratos (por exemplo, `deploy.js`).                   |

## Tecnologias e Ferramentas

- **Smart Contracts:**  
  - *Solidity* - Linguagem para desenvolvimento dos contratos inteligentes.

- **Frameworks de Desenvolvimento:**  
  - *Hardhat* - Para compilar, testar e fazer o deploy dos contratos.
  - *Hardhat Network* - Para a simulação de uma blockchain local e permitir testes rápidos.

- **Bibliotecas de Integração:**  
  - *Web3.js* - Para interligar a lógica blockchain com o front-end e possibilitar a execução de transações e consultas.

- **Testes:**  
  - *Mocha/Chai* - Para a definição e execução de testes unitários e de integração.
  - *Cucumber.js* - Para testes orientados por comportamento, utilizando os arquivos `.feature` e `.steps.js`.

## Configuração do Ambiente

1. **Instalação de Dependências:**

   Certifique-se de que você tem o [Node.js](https://nodejs.org/) e o [npm](https://www.npmjs.com/) instalados. Em seguida, instale as dependências do projeto com:

   ```
   npm install --registry https://registry.npmjs.org/
   ```

2. **Variáveis de Ambiente:**

   - Copie o arquivo `.env.example` para `.env`.
   - Configure as variáveis necessárias, como URLs de rede, portas e chaves, conforme as integrações exigirem.

3. **Rede Local:**

   - Inicie um ambiente de blockchain local utilizando o Ganache ou o Hardhat Network.
   - Atualize as configurações no `.env` para refletir o ambiente de desenvolvimento (ex.: endpoint, porta).

## Fluxo de Desenvolvimento e Deploy

- **Compilação dos Contratos:**

   Utilize o framework escolhido para compilar os contratos:

   ```
   npx hardhat compile
   ```

- **Deploy dos Contratos:**

   Execute os scripts de migração ou deploy. Por exemplo:

   ```
   npx hardhat run scripts/deploy.js --network <nome_rede>
   ```

- **Testes:**

   Para rodar os testes:

   ```
   npm run bdd
   ```

   Os testes cobrem cenários unitários (arquivos dentro de `tests`) e de comportamento utilizando Cucumber.js (arquivos `.feature` e `.steps.js`).

## Comandos Úteis

- **Clean:**
  ```
  rm -rf node_modules package-lock.json
  ```

- **Auditoria e Correção de Vulnerabilidades:**
  ```
  npm audit fix --force --registry https://registry.npmjs.org/
  ```

- **Inicialização da Rede Local:**
  Utilize ferramentas como Ganache ou Hardhat Network.

## Boas Práticas e Contribuições

- Documente e comente os smart contracts e scripts de deploy para facilitar a manutenção.
- Desenvolva testes abrangentes para cada novo recurso ou alteração no protocolo.
- Siga as recomendações de segurança no desenvolvimento de smart contracts para evitar vulnerabilidades.

## Considerações Finais

Esta camada blockchain é o núcleo do protocolo descentralizado, proporcionando uma base robusta para a interação entre os smart contracts e os demais componentes do sistema. Siga as diretrizes listadas aqui para garantir um desenvolvimento fluido e seguro, desde a configuração do ambiente local até o deploy e testes dos contratos.

