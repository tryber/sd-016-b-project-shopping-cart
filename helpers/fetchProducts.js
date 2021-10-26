const fetchProducts = async (products) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${products}`;

  const result = await fetch(url)
  .then((data) => data.json())
  .catch(() => new Error('You must provide an url'));
  return result;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
