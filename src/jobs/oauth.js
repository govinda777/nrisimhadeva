/*
 * This module handles OAuth token retrieval from MercadoPago.
 * You can configure the OAuth credentials via environment variables. Default values are provided for demonstration.
 * To install dependency, run: npm install axios
 */

const axios = require('axios');

async function getOAuthToken() {
  const url = 'https://api.mercadopago.com/oauth/token';
  const payload = {
    client_secret: process.env.MP_CLIENT_SECRET || 'AAAAA',
    client_id: process.env.MP_CLIENT_ID || '1111111',
    grant_type: 'client_credentials',
  };

  try {
    const response = await axios.post(url, payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error retrieving OAuth token:', error.response ? error.response.data : error.message);
    throw error;
  }
}

// If this module is run directly, execute getOAuthToken for testing
if (require.main === module) {
  getOAuthToken()
    .then(tokenData => {
      console.log('OAuth Token Received:', tokenData);
    })
    .catch(err => {
      console.error('Failed retrieving token:', err);
      process.exit(1);
    });
}

module.exports = { getOAuthToken };
