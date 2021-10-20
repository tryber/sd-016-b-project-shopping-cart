const fetchProducts = async (url) => fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${url}`)
  .then((response) => response.json())
  .catch(() => new Error('You must provide an url'));

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
