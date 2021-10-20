const fetchProducts = (q) => fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${q}}`)
  .then((r) => r.json()).then((j) => j.results);

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
