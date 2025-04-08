Feature: Exibir QR Code para Pagamento PIX

  Como usuário do protocolo NRISIMHADEVA,
  desejo visualizar um QR Code com as informações necessárias para efetuar o pagamento via PIX,
  de forma que eu possa converter BRL em tokens de maneira simples e segura.

  Scenario: Exibir QR Code corretamente gerado
    Given que o usuário está autenticado e na página de pagamento
    When o sistema gera um QR Code para pagamento PIX
    Then o QR Code deve ser exibido na interface
    And o QR Code deve conter a chave PIX da administração
    And o QR Code deve incluir o endereço da carteira do usuário

  Scenario: Atualização do QR Code para nova transação
    Given que o usuário está na página de pagamento
    And o usuário informa um valor de "100" BRL para conversão em tokens
    When o sistema processa a solicitação de nova transação
    Then um novo QR Code com os dados atualizados deve ser gerado e exibido
    And o QR Code deve refletir o valor de "100" BRL convertido em tokens
