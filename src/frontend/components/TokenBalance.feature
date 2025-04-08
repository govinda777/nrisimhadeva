Feature: Exibição do Saldo de Tokens

  Como usuário do protocolo NRISIMHADEVA,
  desejo visualizar o saldo de tokens da minha carteira,
  para que eu possa acompanhar minhas operações e investimentos.

  Scenario: Exibir saldo inicial corretamente
    Given que o usuário está autenticado e na página principal
    When o sistema recupera o saldo da carteira a partir da blockchain
    Then o saldo exibido deve refletir a quantidade correta de tokens armazenados

  Scenario: Atualizar saldo após transação de tokens
    Given que o usuário realizou uma transação (compra ou venda) de tokens
    When a transação é confirmada na blockchain
    Then o saldo exibido deve ser atualizado para refletir a mudança
