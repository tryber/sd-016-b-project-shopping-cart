const fetchProducts = async (endpoint = undefined) => {
  // seu código aqui
  const API_URL = `https://api.mercadolibre.com/sites/MLB/search?q=${endpoint}`;

    if (endpoint === undefined) {
      throw new Error('You must provide an url');
    }
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
