const fetchProducts = (query) => {
  if (!query) {
    throw new Error('You must provide an url');
  }

  return fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`)
    .then((result) => result.json())
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
