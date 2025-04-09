# language: pt
# src/blockchain/contracts/NrisimhadevaOracle.feature

Funcionalidade: Oráculo NRISIMHADEVA
  Como operador do protocolo
  Quero que o oráculo integre pagamentos PIX com a blockchain
  Para permitir conversão automática entre BRL e tokens

  Cenário: Detecção de pagamento PIX bem-sucedido
    Dado que um pagamento PIX de R$100 foi recebido para a chave "123-456"
    E o campo 'solicitacaoPagador' contém o endereço "0xUser123"
    Quando o oráculo detecta a transação
    Então o contrato deve emitir 100 tokens para "0xUser123"
    E o evento "TokensIssued" deve ser emitido com os detalhes corretos

  Cenário: Resgate de tokens via PIX
    Dado que o endereço "0xMerchant456" possui 500 tokens
    E possui uma chave PIX "merchant@bank.com" registrada
    Quando o lojista inicia um resgate de 500 tokens
    Então o oráculo deve iniciar uma transferência PIX de R$500 para "merchant@bank.com"
    E os tokens devem ser queimados
    E o evento "TokensRedeemed" deve ser emitido

  Cenário: Detecção de pagamento PIX inválido
    Dado que um pagamento PIX de R$0 foi recebido
    Quando o oráculo tenta processar a transação
    Então a transação deve ser revertida com o erro "Valor inválido"

  Cenário: Resgate com saldo insuficiente
    Dado que o endereço "0xUser789" possui 50 tokens
    Quando tenta resgatar 100 tokens
    Então a transação deve ser revertida com o erro "Saldo insuficiente"
