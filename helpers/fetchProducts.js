const fetchProducts = async (QUERY) => {
  if (!QUERY) throw new Error('You must provide an url');

  return fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${QUERY}`)
  .then((response) => response.json())
  .then((response) => response.results);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
