const fetchProducts = (product) => 
  fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${product}`)
    .then((data) => data.json())
    .catch((error) => error);

// Requisito 1 feito pelo vídeo do instrutor Bernardo.

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
