# language: pt
Funcionalidade: Consulta e Atualização de Dados no Oracle Nrisimhadeva

Antecedentes:
  Dado que a rede blockchain esteja ativa e conectada
  E que o contrato NrisimhadevaOracle tenha sido implantado na rede
  E que o Oracle esteja configurado com dados iniciais precisos

Cenário: Consulta do valor de um ativo
  Quando o usuário consultar o valor do ativo "BTC" através do Oracle
  Então o Oracle deverá retornar o preço atual do "BTC"
  E o valor retornado deverá ser um número maior que zero

Cenário: Atualização dos dados do Oracle
  Dado que novos dados de mercado estejam disponíveis
  Quando o sistema executar a atualização do Oracle
  Então o Oracle deverá registrar os novos preços dos ativos
  E a atualização deve ser confirmada por uma transação na blockchain

Cenário: Resposta em caso de falha na fonte de dados
  Dado que a fonte de dados do Oracle esteja indisponível
  Quando o usuário tentar consultar o preço de um ativo
  Então o Oracle deverá retornar uma mensagem de erro
  E nenhum valor inválido deverá ser exibido
