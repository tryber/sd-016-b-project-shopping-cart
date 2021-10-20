const fetchProducts = async (searchItem) => {
  if (!searchItem) {
    throw new Error('You must provide an url');
  }

  const endpoint = `https://api.mercadolibre.com/sites/MLB/search?q=${searchItem}`;
  const rawData = await fetch(endpoint);
  const jsonData = await rawData.json();

  return jsonData;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
