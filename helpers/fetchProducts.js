const fetchProducts = async (query) => {
  const res = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`)
  .then((response) => response.json())
  .catch((error) => error);
  return res;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
