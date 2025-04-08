Feature: Dashboard do Usuário

  Como usuário autenticado no protocolo NRISIMHADEVA,
  desejo visualizar um dashboard com informações atualizadas
  sobre meu saldo de tokens, histórico de transações e opções para novas operações,
  para acompanhar minhas atividades e interagir com a plataforma de forma clara e intuitiva.

  Scenario: Exibir Dashboard com dados atualizados após login
    Given que o usuário fez login com sucesso
    When o usuário acessa a página do Dashboard
    Then o dashboard deve exibir o saldo atual da carteira
    And o dashboard deve mostrar o histórico completo de transações realizadas
    And o dashboard deve exibir botões para "Comprar Tokens" e "Vender Tokens"

  Scenario: Atualizar informações do Dashboard após nova transação
    Given que o usuário está visualizando o Dashboard
    When uma nova transação de tokens é confirmada na blockchain
    Then o dashboard deve atualizar automaticamente o saldo exibido
    And o novo registro deve ser incluído no histórico de transações

  Scenario: Exibir mensagem de erro ao não carregar dados do Dashboard
    Given que ocorreu um erro ao recuperar os dados do dashboard
    When o usuário tenta acessar a página do Dashboard
    Then o sistema deve exibir uma mensagem de erro informando que os dados não puderam ser carregados
