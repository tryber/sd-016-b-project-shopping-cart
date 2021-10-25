const fetchProducts = async (product) => {
  const api_url = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;

  if (!product) {
    return new Error('You must provide an url');
  }

  const response = await fetch(api_url);
  return response.json();

};

console.log(fetchProducts());

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
