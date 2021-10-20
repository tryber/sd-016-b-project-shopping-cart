const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';

const fetchProducts = () => fetch(url)
  .then((response) => response.json())
  .then((data) => data)
  .catch((error) => console.log(error));

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
