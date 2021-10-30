const fetchProducts = async (query) => {
  if (typeof query !== typeof '') {
    return new Error('You must provide an url');
  }
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
    const result = await fetch(url)
    .then((response) => response.json())
    .then((data) => data);
    return result;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
