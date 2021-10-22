const fetchProducts = async (product) => {
  // seu código aqui
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
  const result = await fetch(url)
    .then((response) => response.json())
    .then((data) => data.results)
    .catch(() => new Error('You must provide an url'));
  return result;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
