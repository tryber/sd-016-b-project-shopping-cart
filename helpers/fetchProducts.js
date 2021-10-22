const fetchProducts = (searchedProduct) => {
  return fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${searchedProduct}`)
    .then((response) => response.json())
    .catch((error) => error);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
