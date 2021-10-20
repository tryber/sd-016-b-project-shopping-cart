const API_URL = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';

const fetchProducts = () => ( 
  fetch(API_URL)
    .then((response) => response.json())
    .then((data) => data.results)
    .catch((error) => console.log(error))
);

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
