const fetchProducts = (q = 'computador') => {
  const result = fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${q}`)
    .then((response) => response.json())
    .then((data) => data.results);
  return result;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
