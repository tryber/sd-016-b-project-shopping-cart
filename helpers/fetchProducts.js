const fetchProducts = async (query) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  const result = await fetch(url)
    .then((response) => response.json())
    .then((data) => data.results);
  return result;
};
console.log(typeof fetchProducts);
fetchProducts('computador');

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts, 
  };
}
