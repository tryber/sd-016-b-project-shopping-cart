const fetchProducts = () => {
  return fetch('https://api.mercadolibre.com/sites/MLB/search?q=computador')
    .then((response) => response.json())
    .then((dataJSON) => dataJSON.results);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
