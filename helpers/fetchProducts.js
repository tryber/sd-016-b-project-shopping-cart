const fetchProducts = (productName) => {
  if (!productName) throw new Error('You must provide an url');

  const endPoint = `https://api.mercadolibre.com/sites/MLB/search?q=${productName}`;

  return fetch(endPoint)
    .then((response) => response.json());
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
