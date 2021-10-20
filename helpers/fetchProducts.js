const fetchProducts = (q = 'computador') => {
  fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${q}`).then((r) => r.json());
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
