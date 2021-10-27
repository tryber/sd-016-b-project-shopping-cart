const fetchProducts = async (product) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;

  const listProductsApi = await fetch(url)
  .then((response) => response.json())
  .catch(() => new Error('You must provide an url'));
  return listProductsApi;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
