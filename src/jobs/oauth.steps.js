const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');

// Step for valid application credentials
Given('que tenho credenciais válidas de aplicação', function (dataTable) {
  const data = dataTable.rowsHash();
  this.credentials = data;
});

// Step for valid authorization code with PKCE
Given('que tenho um código de autorização válido com PKCE', function (dataTable) {
  const data = dataTable.rowsHash();
  this.authCodeData = data;
});

// Step for valid refresh token
Given('que tenho um refresh_token válido', function (dataTable) {
  const data = dataTable.rowsHash();
  this.refreshData = data;
});

// Step to simulate sending a POST request to /oauth/token
When('envio uma requisição POST para {string} com:', function (url, docString) {
  assert.strictEqual(url, "/oauth/token", "Unexpected URL");
  const payload = JSON.parse(docString);
  
  // Merge stored context data if applicable
  if (payload.grant_type === 'client_credentials' && this.credentials) {
    payload.client_id = payload.client_id || this.credentials.client_id;
    payload.client_secret = payload.client_secret || this.credentials.client_secret;
  }
  if (payload.grant_type === 'authorization_code' && this.authCodeData) {
    payload.code = payload.code || this.authCodeData.code;
    payload.redirect_uri = payload.redirect_uri || this.authCodeData.redirect_uri;
    payload.code_verifier = payload.code_verifier || this.authCodeData.code_verifier;
  }
  if (payload.grant_type === 'refresh_token' && this.refreshData) {
    payload.refresh_token = payload.refresh_token || this.refreshData.refresh_token;
  }
  
  let response;
  
  // Simulate responses based on grant_type
  if (payload.grant_type === 'client_credentials') {
    if (payload.client_id === 'invalido' || payload.client_secret === 'errado') {
      response = { status: 400, body: { error: 'invalid_client', message: 'invalid client or secret' } };
    } else {
      response = { status: 200, body: { access_token: 'AAAAA', token_type: 'Bearer', expires_in: 21600, live_mode: true } };
    }
  } else if (payload.grant_type === 'authorization_code') {
    if (payload.code && payload.redirect_uri && payload.code_verifier) {
      response = { status: 200, body: { access_token: 'AUTH_CODE_TOKEN', token_type: 'Bearer', expires_in: 21600, live_mode: true, scope: 'offline_access payments read write' } };
    } else {
      response = { status: 400, body: { error: 'invalid_request', message: 'missing parameters' } };
    }
  } else if (payload.grant_type === 'refresh_token') {
    if (payload.refresh_token && payload.refresh_token.startsWith('TG-')) {
      response = { status: 200, body: { access_token: 'NEW_ACCESS_TOKEN', token_type: 'Bearer', expires_in: 21600, live_mode: true } };
    } else {
      response = { status: 400, body: { error: 'invalid_request', message: 'invalid or missing refresh token' } };
    }
  } else {
    response = { status: 400, body: { error: 'unsupported_grant_type', message: 'The grant_type provided is not supported' } };
  }
  
  this.response = response;
});

// Step to check response status
Then('a resposta deve ter status {int}', function (expectedStatus) {
  assert.strictEqual(this.response.status, expectedStatus);
});

// Step to check that the response body contains expected key-value pairs
Then('o corpo da resposta deve conter:', function (docString) {
  const expectedBody = JSON.parse(docString);
  for (const key in expectedBody) {
    assert.deepStrictEqual(this.response.body[key], expectedBody[key], `Mismatch on key ${key}`);
  }
});

// Step to check that the response body contains a specific field
Then('o corpo da resposta deve conter {string}', function (field) {
  assert.ok(this.response.body[field] !== undefined, `Expected response body to contain field ${field}`);
});

// Step to check that a field in the response contains a specific value
Then('o campo {string} deve conter {string}', function (field, value) {
  const fieldValue = this.response.body[field];
  assert.ok(fieldValue && fieldValue.includes(value), `Expected field ${field} to contain ${value}`);
});

// Step to check that the response body contains a new field
Then('o corpo da resposta deve conter novo {string}', function (field) {
  assert.ok(this.response.body[field] !== undefined, `Expected new response body to contain field ${field}`);
});
