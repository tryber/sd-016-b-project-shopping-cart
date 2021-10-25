const fetchProducts = (computer) => (
  fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${computer}`)
    .then((response) => response.json())
);

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
