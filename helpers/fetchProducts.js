const API_URL = 'https://api.mercadolibre.com/sites/MLB/search?q=';

const fetchProducts = (QUERY) => fetch(`${API_URL}${QUERY}`)
  .then((response) => response.json())
  .then((data) => data)
  .catch((error) => error);

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
