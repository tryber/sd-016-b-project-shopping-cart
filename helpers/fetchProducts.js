const fetchProducts = (q) => {
  if (!q) throw new Error('You must provide an url');
  return fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${q}`).then((r) => r.json());
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
