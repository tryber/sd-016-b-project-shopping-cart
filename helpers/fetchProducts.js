const apiML = 'https://api.mercadolibre.com/sites/MLB/search?q=';
const fetchProducts = (query = 'computador') => fetch(`${apiML}${query}`)
    .then((promise) => promise.json()
      .then((data) => data.results));

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
