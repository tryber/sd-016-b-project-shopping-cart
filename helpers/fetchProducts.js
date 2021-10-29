const fetchProducts = (product) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
  fetch(url)
  .then((list) => list.json())
  .catch((error) => error);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
