Feature: Página Home

  Como visitante ou usuário do protocolo NRISIMHADEVA,
  desejo visualizar informações essenciais na página inicial,
  para me informar sobre as funcionalidades do protocolo e iniciar o fluxo de autenticação.

  Scenario: Exibir informações principais na Página Home
    Given que o visitante acessa a URL principal do protocolo
    When a página Home for carregada
    Then deve ser exibido um cabeçalho com o título "NRISIMHADEVA Protocolo"
    And a página deve apresentar uma breve descrição explicando que o sistema permite a conversão bidirecional entre BRL e tokens digitais
    And deve ser exibida uma seção com opções para autenticação via Auth0 ou Wallet

  Scenario: Navegar para a Página de Login
    Given que o visitante está na Página Home
    When o visitante clica no botão "Login"
    Then o sistema deve redirecionar o usuário para a página de Login

  Scenario: Exibir seção de informações institucionais e links úteis
    Given que a Página Home está completamente carregada
    When o visitante visualiza o conteúdo
    Then devem ser exibidas seções de informações institucionais sobre o protocolo
    And links para "Documentação", "FAQ" e "Contato" devem estar visíveis na página
