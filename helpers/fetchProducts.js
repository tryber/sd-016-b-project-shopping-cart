const fetchProducts = async (product) => {
  if (product === 'undefined') {
    throw new Error('You must provide an url');
  }
  
  const result = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${product}`)
  .then((response) => response.json())
  .then((data) => data.results);
  return result;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
