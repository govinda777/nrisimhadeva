# language: pt

# src/jobs/oauth.feature
Funcionalidade: Autenticação OAuth com Mercado Pago
  Como desenvolvedor
  Quero integrar o protocolo OAuth
  Para obter tokens de acesso seguros para a API

  Cenário: Obter Access Token com client_credentials válidos
    Dado que tenho credenciais válidas de aplicação
      | client_id     | client_secret |
      | <CLIENT_ID>   | <CLIENT_SECRET> |
    Quando envio uma requisição POST para "/oauth/token" com:
      """
      {
        "grant_type": "client_credentials",
        "client_id": "<CLIENT_ID>",
        "client_secret": "<CLIENT_SECRET>"
      }
      """
    Então a resposta deve ter status 200
    E o corpo da resposta deve conter:
      """
      {
        "access_token": "AAAAA",
        "token_type": "Bearer",
        "expires_in": 21600,
        "live_mode": true
      }
      """

  Cenário: Obter Access Token com authorization_code e PKCE
    Dado que tenho um código de autorização válido com PKCE
      | code            | redirect_uri                  | code_verifier       |
      | TG-XXXXXXXX...  | https://meusite.com/callback  | 47DEQpj8HBSa-_TImW... |
    Quando envio uma requisição POST para "/oauth/token" com:
      """
      {
        "client_id": "<CLIENT_ID>",
        "client_secret": "<CLIENT_SECRET>",
        "grant_type": "authorization_code",
        "code": "TG-XXXXXXXX...",
        "redirect_uri": "https://meusite.com/callback",
        "code_verifier": "47DEQpj8HBSa-_TImW..."
      }
      """
    Então a resposta deve ter status 200
    E o corpo da resposta deve conter "access_token"
    E o campo "scope" deve conter "offline_access payments"

  Cenário: Renovar token expirado com refresh_token
    Dado que tenho um refresh_token válido
      | refresh_token   |
      | TG-YYYYYYYY...  |
    Quando envio uma requisição POST para "/oauth/token" com:
      """
      {
        "client_id": "<CLIENT_ID>",
        "client_secret": "<CLIENT_SECRET>",
        "grant_type": "refresh_token",
        "refresh_token": "TG-YYYYYYYY..."
      }
      """
    Então a resposta deve ter status 200
    E o corpo da resposta deve conter novo "access_token"

  Cenário: Tentativa de autenticação com credenciais inválidas
    Quando envio uma requisição POST para "/oauth/token" com:
      """
      {
        "client_id": "invalido",
        "client_secret": "errado",
        "grant_type": "client_credentials"
      }
      """
    Então a resposta deve ter status 400
    E o corpo da resposta deve conter:
      """
      {
        "error": "invalid_client",
        "message": "invalid client or secret"
      }
      """

  Exemplos: Modos de operação
    | test_token | ambiente  |
    | true       | sandbox   |
    | false      | produção  |
