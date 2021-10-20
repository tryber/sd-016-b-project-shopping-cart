const API_URL = 'https://api.mercadolibre.com/sites/MLB/search?q=$';

const fetchProducts = async (QUERY) => fetch(`${API_URL}${QUERY}`)
  .then((response) => response.json())
  .then((data) => data.results)
  .catch((error) => console.log('seu erro é: ', error));

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
