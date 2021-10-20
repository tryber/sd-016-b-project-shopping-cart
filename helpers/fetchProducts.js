const fetchProducts = async (parametro) => {
  if (parametro === undefined) {
    throw new Error('You must provide an url');
  }
  return fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${parametro}`)
  .then((response) => response.json())
  .then((arquivo) => arquivo);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
