const getUrl = (query) => `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;

const fetchProducts = (item) => {
  const url = getUrl(item);
  // if (item === undefined) throw new Error('You must provide an url');
  return fetch(url)
  .then((response) => response.json())
  .then((data) => data);
};
// fetchProducts('computador')

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
