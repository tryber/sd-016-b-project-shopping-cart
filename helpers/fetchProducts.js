const fetchProducts = (product) => (
 fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${product}`)
 .then((response) => response.json())
);

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
