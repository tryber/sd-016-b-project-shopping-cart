const fetchProducts = async (QUERY) => {
  if (typeof QUERY !== 'string') return new Error('You must provide an url');

  const result = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${QUERY}`)
  .then((response) => response.json())
  .then((data) => data);
  
  return result;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
