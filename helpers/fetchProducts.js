const fetchProducts = (product) => {
  const item = fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${product}`)
    .then((result) => result.json())
    .catch((err) => err);
  return item;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
