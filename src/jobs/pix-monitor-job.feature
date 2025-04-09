Feature: Monitoramento de Transações PIX
  
  Como administrador do sistema,
  Eu quero que o Job de Monitoramento PIX processe novas transações PIX concluídas e não processadas,
  para que os pagamentos sejam processados on-chain e as transações sejam marcadas como processadas.

  Background:
    Dado que a API do PIX esteja configurada com credenciais válidas
    E que o contrato Oracle esteja implantado e acessível

  Scenario: Processar uma nova transação PIX concluída e não processada
    Dado que a API do PIX retorne uma lista com pelo menos uma transação com status "completed" e com a flag de processado como false
    Quando o Job de Monitoramento PIX for executado
    Então o job deve gerar um ID único para a transação
    E o job deve chamar a função processPIXPayment no contrato Oracle com o ID único, o endereço do pagador e o valor do pagamento
    E o job deve marcar a transação como processada na API do PIX
    E uma transação na blockchain deve ser confirmada

  Scenario: Tratar erro na comunicação com a API do PIX
    Dado que a API do PIX esteja inacessível ou retorne um erro
    Quando o Job de Monitoramento PIX for executado
    Então o job deve registrar uma mensagem de erro indicando a falha
    E nenhuma transação na blockchain deve ser tentada

  Scenario: Nenhuma transação válida para processar
    Dado que a API do PIX retorne apenas transações que não estejam concluídas ou que já tenham sido processadas
    Quando o Job de Monitoramento PIX for executado
    Então o job não deve chamar a função processPIXPayment
    E deve registrar que não há transações para processar
