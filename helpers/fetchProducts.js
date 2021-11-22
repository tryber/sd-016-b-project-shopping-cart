const fetchProducts = async (search) => {
  const find = fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${search}`)
  .then((response) => response.json())
  .then((data) => data.results)
  .catch((error) => error);
  return find;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
