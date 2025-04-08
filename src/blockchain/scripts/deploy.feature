# language: pt
Funcionalidade: Deploy do Contrato Inteligente

Antecedentes:
  Dado que a rede blockchain esteja ativa e conectada
  E que os contratos inteligentes tenham sido compilados sem erros

Cenário: Deploy bem-sucedido do contrato inteligente
  Quando o script de deploy for executado
  Então uma transação de deploy deve ser enviada para a blockchain
  E um endereço de contrato válido deve ser retornado
  E o contrato deve responder corretamente às funções de teste
