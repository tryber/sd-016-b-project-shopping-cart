const fetchProducts = async (product) => {
  if (!product) throw new Error('You must provide an url');
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data.results);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
