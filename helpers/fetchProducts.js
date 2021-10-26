const fetchProducts = (item) =>
  fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${item}`)
  .then((response) => response.json())
  .then((data) => data)
  .catch((error) => error);
  
if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
