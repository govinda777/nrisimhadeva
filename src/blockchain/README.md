# Blockchain Layer

npm install --registry https://registry.npmjs.org/
npm install --save-dev hardhat --registry https://registry.npmjs.org/
npm install --save-dev @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers ethers dotenv --registry https://registry.npmjs.org/
npm audit fix --force --registry https://registry.npmjs.org/
npm install ganache --registry https://registry.npmjs.org/
npm install ethereum-waffle@latest --registry https://registry.npmjs.org/
npm install hardhat@latest --registry https://registry.npmjs.org/
npm install ethereum-waffle@4.0.10 --registry https://registry.npmjs.org/

npm install --save-dev @nomiclabs/hardhat-etherscan --registry https://registry.npmjs.org/

npm uninstall @nomiclabs/hardhat-etherscan --registry https://registry.npmjs.org/
npm install --save-dev @nomicfoundation/hardhat-verify --registry https://registry.npmjs.org/

npm install --save-dev dotenv @nomiclabs/hardhat-ethers @nomicfoundation/hardhat-verify --registry https://registry.npmjs.org/

npm install @openzeppelin/contracts --registry https://registry.npmjs.org/

npm install -g npm-run-all --registry https://registry.npmjs.org/


rm -rf node_modules package-lock.json

---

npx hardhat run scripts/deploy.js --network polygon_amoy


Este diretório contém toda a lógica e os componentes relacionados à camada blockchain do protocolo descentralizado. Aqui você encontrará os smart contracts, scripts de migração, testes e scripts de deploy que compõem a base dos serviços blockchain da aplicação.

## Estrutura do Diretório

| Diretório      | Descrição                                                                                                         |
| -------------- | ----------------------------------------------------------------------------------------------------------------- |
| **contracts**  | Contém os smart contracts escritos em Solidity (por exemplo, `NrisimhadevaToken.sol` e `NrisimhadevaOracle.sol`).      |
| **migrations** | Scripts e arquivos de configuração para migrar e implantar os smart contracts (ex.: `1_deploy_contracts.js`).         |
| **tests**      | Testes unitários e de integração dos contratos, garantindo a funcionalidade correta (ex.: `token.test.js`, `oracle.test.js`). |
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
   npm install
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
   npm test
   ```
   ou diretamente com Mocha:

   ```
   npx mocha
   ```

   Os testes cobrem cenários unitários (arquivos dentro de `tests`) e de comportamento utilizando Cucumber.js (arquivos `.feature` e `.steps.js`).

## Boas Práticas e Contribuições

- Documente e comente os smart contracts e scripts de deploy para facilitar a manutenção.
- Desenvolva testes abrangentes para cada novo recurso ou alteração no protocolo.
- Siga as recomendações de segurança no desenvolvimento de smart contracts para evitar vulnerabilidades.

## Considerações Finais

Esta camada blockchain é o núcleo do protocolo descentralizado, proporcionando uma base robusta para a interação entre os smart contracts e os demais componentes do sistema. Siga as diretrizes listadas aqui para garantir um desenvolvimento fluido e seguro, desde a configuração do ambiente local até o deploy e testes dos contratos.

