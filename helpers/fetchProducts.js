const fetchProducts = async (product) => {
  if (product === 'undefined') {
    throw new Error('You must provide an url');
  }
  return await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${product}`)
  .then((response) => response.json())
};
console.log(fetchProducts());
if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
