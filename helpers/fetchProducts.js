const fetchProducts = (product) => {
  const items = fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${product}`)
    .then((response) => response.json())
    .catch(() => new Error('You must provide an url'));
  return items;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
