const API_URL = 'https://api.mercadolibre.com/sites/MLB/search?q=$';

const fetchProducts = (QUERY = 'computador') => {
  // seu código aqui
  const fullURL = `${API_URL}${QUERY}`;
  return fetch(fullURL)
  .then((response) => response.json())
  .then((data) => data.results);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
