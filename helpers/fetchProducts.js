const fetchProducts = (searchedProduct) =>
  fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${searchedProduct}`)
    .then((response) => response.json())
    .catch((error) => error);

// document.querySelector('.loading').remove();

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
