const fetchProducts = (product) => {
  const URL = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;

  if (product === undefined) {
    throw new Error('You must provide an url');
  }

  const products = fetch(URL)
    .then((response) => response.json())
    .catch((error) => error.toString());

  return products;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
