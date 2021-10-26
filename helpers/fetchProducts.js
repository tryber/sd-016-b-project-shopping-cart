const fetchProducts = async (product) => {
  if (product === 'undefined') {
    throw new Error('You must provide an url');
  }
  return fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${product}`)
  .then((response) => response.json());
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
