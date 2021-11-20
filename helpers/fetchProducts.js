const fetchProducts = async (search) => {
  try {
    const fetchRequest = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${search}`);
    const data = await fetchRequest.json();
    return data.results;
  } catch (error) {
    throw new Error('You must provide an url');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
