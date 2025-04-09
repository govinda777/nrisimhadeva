# language: pt
# src/blockchain/contracts/NrisimhadevaOracle.feature

Funcionalidade: Oráculo NRISIMHADEVA
  Como operador do protocolo
  Quero que o oráculo integre pagamentos PIX com a blockchain
  Para permitir conversão automática entre BRL e tokens

  Cenário: Detecção de pagamento PIX bem-sucedido
    Dado que um pagamento PIX de R$100 foi recebido para a chave "123-456"
    E o campo 'solicitacaoPagador' contém o endereço "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
    Quando o oráculo detecta a transação
    Então o contrato deve emitir 100 tokens para "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
    E o evento "PixPaymentDetected" deve ser emitido com os detalhes corretos

  Cenário: Resgate de tokens via PIX
    Dado que o endereço "0x70997970C51812dc3A010C7d01b50e0d17dc79C8" possui 500 tokens
    E possui uma chave PIX "merchant@bank.com" registrada
    Quando o lojista inicia um resgate de 500 tokens
    Então o oráculo deve iniciar uma transferência PIX de R$500 para "merchant@bank.com"
    E os tokens devem ser queimados
    E o evento "PixPaymentProcessed" deve ser emitido

  Cenário: Detecção de pagamento PIX inválido
    Dado que um pagamento PIX de R$0 foi recebido
    Quando o oráculo tenta processar a transação
    Então a transação deve ser revertida com o erro "Valor invalido"

  Cenário: Resgate com saldo insuficiente
    Dado que o endereço "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC" possui 50 tokens
    Quando tenta resgatar 100 tokens
    Então a transação deve ser revertida com o erro "Saldo insuficiente"
