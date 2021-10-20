const API_URL = 'https://api.mercadolibre.com/sites/MLB/search?q=';

// const fetch = require('node-fetch');

const fetchProducts = async (QUERY) => fetch(`${API_URL}${QUERY}`)
  .then((response) => response.json())
  .then((data) => data)
  .catch((error) => console.log('Seu erro é: ', error));

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
