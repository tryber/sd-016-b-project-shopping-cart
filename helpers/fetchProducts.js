const API_URL = 'https://api.mercadolibre.com/sites/MLB/search';

const fetchProducts = async (query) => {
  if (!query) throw new Error('You must provide an url');

  const queryUrl = `${API_URL}?q=${query}`;

  return fetch(queryUrl)
    .then((response) => response.json())
    .then((data) => data.results);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
