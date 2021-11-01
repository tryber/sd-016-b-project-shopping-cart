const fetchProducts = (item) => fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${item}`)
.then((resposta) => resposta.json());

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
