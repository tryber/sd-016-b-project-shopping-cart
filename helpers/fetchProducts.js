const fetchProducts = (product) => {
  return fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${product}`)
  .then((resposta) => resposta.json())
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
