const fetchProducts = async (product) => {
  const API_URL = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;

  try {
    const response = await fetch(API_URL);
    return response.json();
  } catch (error) {
    return new Error('You must provide an url');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
