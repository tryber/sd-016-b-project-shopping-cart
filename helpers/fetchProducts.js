const fetchProducts = () => fetch('https://api.mercadolibre.com/sites/MLB/search?q=computador')
    .then((response) => response.json())
    .then((item) => item)
    .catch((error) => console.log(error));

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
