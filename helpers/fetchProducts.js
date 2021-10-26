const fetchProducts = (prod) => fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${prod}`)
  .then((data) => data.json())
  .catch((error) => error);

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
