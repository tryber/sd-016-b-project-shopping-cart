const fetchProducts = (item) => fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${item}`)
    .then((response) => response.json())
      .then((data) => data)
        .catch((erro) => erro);
        
if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
