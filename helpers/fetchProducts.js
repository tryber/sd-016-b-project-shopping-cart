const fetchProducts = (query) => {
  if (!query) throw new Error('You must provide an url');

  const queryUrl = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;

  return fetch(queryUrl)
    .then((response) => response.json())
    .then((data) => data.results);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
