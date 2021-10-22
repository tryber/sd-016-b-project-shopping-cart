const fetchProducts = (product) => {
  const URL = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;

  const products = fetch(URL)
    .then((response) => response.json())
    .catch(() => new Error('You must provide an url'));

  return products;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
