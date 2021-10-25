const fetchProducts = (query) => 
  fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`)
  .then((data) => data.json())
  .catch((error) => error);

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
