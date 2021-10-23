const fetchProducts = (product) => {
  // seu código aqui
  return fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${product}`)
    .then((data) => data.json())
    .catch((error) => error);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
