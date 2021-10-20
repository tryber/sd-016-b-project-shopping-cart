const fetchProducts = async () => {
  const result = await fetch('https://api.mercadolibre.com/sites/MLB/search?q=computador')
  .then((response) => response.json())
  .then((data) => data.results);
  return result;
};

fetchProducts();

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
