const fetchProducts = (produto) => {
  return fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${produto}`)
    .then((data) => data.json())
    .catch((error) => error);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
