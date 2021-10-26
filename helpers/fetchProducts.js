const fetchProducts = (itens) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${itens}`;
  const result = fetch(url)
    .then((response) => response.json())
    .catch(() => new Error('You must provide an url'));
  return result;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
