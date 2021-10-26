const fetchProducts = async (query) => {
  if (!query) return new Error('You must provide an url');

  return fetch('https://api.mercadolibre.com/sites/MLB/search?q=' + query)
    .then((response) => response.json())
    .catch((error) => console.log('Error on searching...', error));
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
