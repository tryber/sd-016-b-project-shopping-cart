const fetchProducts = (pdt) => fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${pdt}`)
  .then((data) => data.json())
  .catch((error) => error);

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
