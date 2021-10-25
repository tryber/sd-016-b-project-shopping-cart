const fetchProducts = async (searchArg) => {
  if (!searchArg) {
    throw new Error('You must provide an URL.');
  }
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=$${searchArg}`;
  const data = await fetch(url);
  const jsonData = await data.json();
  return jsonData.results;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
