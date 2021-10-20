const fetchProducts = async (query = 'computador') => {
 const url = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
 const result = await fetch(url)
 .then((response) => response.json())
 .then((data) => data.results);

return result;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
