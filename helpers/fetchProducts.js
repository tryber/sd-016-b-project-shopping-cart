const fetchProducts = async () => {
  const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';

  const rawData = await fetch(endpoint);
  const jsonData = await rawData.json();

  return jsonData;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
