const fetchProducts = async (item) => {
  if (item === undefined) {
    return 'You must provide an url';
  }
  const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${item}`);
  const data = await response.json();
  return data.results;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
