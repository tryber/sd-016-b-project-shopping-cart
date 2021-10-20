const API_URL = 'https://api.mercadolibre.com/sites/MLB/search?q=';

const fetchProducts = (QUERY) => {
  if (QUERY.length < 1) {
    throw new Error('You must provide an url');
  }
  return fetch(`${API_URL}${QUERY}`)
  .then((response) => response.json())
  .then((data) => data)
  .catch((error) => console.log('Seu erro é: ', error));
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
