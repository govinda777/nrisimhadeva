# language: pt
Funcionalidade: Migração e Deploy dos Contratos Inteligentes

Antecedentes:
  Dado que a rede blockchain esteja acessível e operacional[1]
  E que os contratos inteligentes tenham sido compilados com sucesso[1]
  E que as configurações de migração estejam definidas corretamente[7]

Cenário: Migração inicial para deploy dos contratos
  Quando o script de migração "1_deploy_contracts" for executado[2]
  Então as transações de deploy devem ser enviadas para a rede blockchain[1]
  E os endereços dos contratos implantados devem ser registrados[1]
  E cada contrato deve responder corretamente às funções de teste[5]
