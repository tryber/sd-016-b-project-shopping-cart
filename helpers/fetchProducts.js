const API_URL = 'https://api.mercadolibre.com/sites/MLB/search';

const fetchProducts = (QUERY = 'computador') => {
  const queryUrl = `${API_URL}?q=${QUERY}`;

  return fetch(queryUrl)
    .then((response) => response.json());
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
