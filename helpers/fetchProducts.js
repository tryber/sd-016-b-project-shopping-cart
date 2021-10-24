// eslint-disable-next-line import/no-unresolved
// const fetch = require('node-fetch');

const fetchProducts = () =>
  fetch('https://api.mercadolibre.com/sites/MLB/search?q=computador')
  .then((response) => response.json())
  .then((data) => data);

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
