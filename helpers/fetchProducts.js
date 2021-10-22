const fetchProducts = async (produto) => {
  const fetchResults = fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${produto}`)
    .then((data) => data.json())
    .catch((error) => error);
  return fetchResults;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
