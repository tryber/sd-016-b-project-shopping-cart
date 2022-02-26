const fetchProducts = (product) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
  return fetch(url)
   .then((data) => data.json())
   .catch((error) => error);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
