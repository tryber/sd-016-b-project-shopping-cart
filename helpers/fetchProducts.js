const fetchProducts = async (produto) => {
  const result = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${produto}`)
    .then((response) => response.json())
    .catch(() => new Error('You must provide an url'));
  return result;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
