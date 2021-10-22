const fetchProducts = (searchParam) => fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${searchParam}`)
    .then((response) => response.json())
    .then((data) => data.results)
    .catch(() => new Error('You must provide an url'));

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
