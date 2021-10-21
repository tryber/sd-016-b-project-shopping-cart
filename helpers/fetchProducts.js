const apiML = 'https://api.mercadolibre.com/sites/MLB/search?q=';
const fetchProducts = (query) => fetch(`${apiML}${query}`)
  .then((promise) => promise.json()
    .then((data) => data.results))
  .catch(() => new Error('You must provide an url'));

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
