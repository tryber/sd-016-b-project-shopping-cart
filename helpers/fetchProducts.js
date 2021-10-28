const fetchProducts = (productName) => {
  fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${productName}`)
  .then((response) => response.json())
  .then((data) => data)
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
