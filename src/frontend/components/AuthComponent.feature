Feature: Autenticação do Usuário

  Para acessar o protocolo NRISIMHADEVA de forma segura,
  como usuário, desejo fazer login utilizando Auth0 ou minha Wallet.

  Scenario: Autenticação com Auth0
    Given que o usuário está na página de autenticação
    When o usuário clica no botão "Login com Auth0"
    And insere um email válido e a senha correta
    Then o sistema autentica o usuário com sucesso
    And redireciona o usuário para a página principal

  Scenario: Autenticação com Wallet
    Given que o usuário está na página de autenticação
    When o usuário clica no botão "Conectar Wallet"
    And a Wallet do usuário é sincronizada com o sistema
    Then o sistema autentica o usuário com sucesso
    And exibe o saldo atual da carteira
