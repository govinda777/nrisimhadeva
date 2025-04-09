Feature: Orquestrador de Jobs
  Como administrador do sistema,
  Eu quero orquestrar a execução de jobs,
  Para assegurar que os processos sejam executados na ordem correta.

Cenário: Execução bem-sucedida dos jobs
  Dado que existem jobs pendentes
  Quando o orquestrador de jobs é acionado
  Então os jobs devem ser executados com sucesso

Cenário: Falha na execução de um job
  Dado que existe um job com erros
  Quando o orquestrador de jobs é acionado
  Então o job deve ser marcado como falho
