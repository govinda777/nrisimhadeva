# language: pt
Funcionalidade: Teste do Contrato NrisimhadevaToken

Antecedentes:
  Dado que a rede blockchain esteja ativa e conectada
  E que o contrato NrisimhadevaToken tenha sido implantado na rede

Cenário: Verificar o total de tokens iniciais
  Quando consulto o total de tokens do contrato
  Então o valor retornado deve ser 1000000 tokens

Cenário: Transferência de tokens entre contas
  Dado que a conta "A" possua 500 tokens
  Quando a conta "A" transferir 200 tokens para a conta "B"
  Então o saldo da conta "A" deverá ser 300 tokens
  E o saldo da conta "B" deverá ser 200 tokens

Cenário: Aprovação e transferência delegada de tokens
  Dado que a conta "owner" possua 1000 tokens
  Quando a conta "owner" aprovar a conta "spender" para gastar 300 tokens
  E a conta "spender" executar uma transferência de 300 tokens da conta "owner" para a conta "C" utilizando a função transferFrom
  Então o saldo da conta "owner" deverá ser reduzido em 300 tokens
  E o saldo da conta "C" deverá ser aumentado em 300 tokens
  E a permissão da conta "spender" deverá ser zerada pós-transferência
