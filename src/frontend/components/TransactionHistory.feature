Feature: Histórico de Transações

  Como usuário do protocolo NRISIMHADEVA,
  desejo visualizar um histórico detalhado das minhas transações,
  para que eu possa acompanhar as operações realizadas na blockchain.

  Scenario: Exibir histórico vazio quando não houver transações
    Given que o usuário está autenticado e na página principal
    When o sistema recupera o histórico de transações da blockchain
    Then o componente "TransactionHistory" deve exibir uma mensagem "Nenhuma transação encontrada"

  Scenario: Exibir histórico após compra de tokens
    Given que o usuário completou uma transação de compra de tokens
    And a transação foi confirmada na blockchain
    When o sistema atualiza o histórico de transações
    Then o componente "TransactionHistory" deve listar a transação com detalhes como data, tipo "Compra" e valor convertido

  Scenario: Atualização dinâmica do histórico
    Given que o usuário está visualizando o histórico de transações
    When uma nova transação (venda ou transferência) é registrada na blockchain
    Then o componente "TransactionHistory" deve atualizar automaticamente para mostrar a nova transação
