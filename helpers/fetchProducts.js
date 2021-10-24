const fetchProducts = (searchTerm) => {
  if (!searchTerm) throw new Error('You must provide an url');

  return fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${searchTerm}`)
    .then((res) => res.json());
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
