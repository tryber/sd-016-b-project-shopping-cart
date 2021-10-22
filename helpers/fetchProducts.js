const fetchProducts = (productName) => (
  fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${productName}`)
    .then((response) => response.json())
);

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
