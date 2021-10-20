const fetchProducts = async (QUERY) => {
  // seu código aqui
  const API_URL = `https://api.mercadolibre.com/sites/MLB/search?q=${QUERY}`;

  const response = await fetch(API_URL);
  const data = await response.json();
  return data.results;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
