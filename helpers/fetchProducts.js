const fetchProducts = (QUERY) => {
  const endPoint = `https://api.mercadolibre.com/sites/MLB/search?q=${QUERY}`;
  return fetch(endPoint)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => error);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
