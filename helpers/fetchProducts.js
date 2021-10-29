const fetchProducts = async (product) => {
  const API_URL = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;

  if (!product) {
    return new Error('You must provide an url');
  }

  const response = await fetch(API_URL);
  return response.json();
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
