Feature: Página de Login

  Como usuário que deseja acessar o protocolo NRISIMHADEVA,
  quero fazer login utilizando Auth0 ou conectar minha Wallet,
  para obter acesso às funcionalidades restritas e visualizar meu dashboard.

  Scenario: Login bem-sucedido utilizando Auth0
    Given que o usuário está na página de Login
    When o usuário clica no botão "Login com Auth0"
    And o usuário insere um email e senha válidos
    Then o sistema autentica o usuário com sucesso
    And o usuário é redirecionado para o Dashboard

  Scenario: Login bem-sucedido utilizando Wallet
    Given que o usuário está na página de Login
    When o usuário clica no botão "Conectar Wallet"
    And a carteira do usuário é sincronizada corretamente com o sistema
    Then o sistema autentica o usuário com sucesso
    And o usuário é redirecionado para o Dashboard

  Scenario: Falha no login com Auth0 devido a credenciais inválidas
    Given que o usuário está na página de Login
    When o usuário clica no botão "Login com Auth0"
    And o usuário insere credenciais inválidas
    Then o sistema exibe uma mensagem de erro "Credenciais inválidas"
    And o usuário permanece na página de Login

  Scenario: Falha na conexão com a Wallet
    Given que o usuário está na página de Login
    When o usuário clica no botão "Conectar Wallet"
    And ocorre um erro durante a sincronização da carteira
    Then o sistema exibe uma mensagem de erro "Erro ao conectar com a Wallet"
    And o usuário permanece na página de Login
