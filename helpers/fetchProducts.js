const fetchProducts = (product) => 
  fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${product}`)
    .then((data) => data.json())
    .catch((error) => error);

// Todo o requisito 1 foi feito utilizando o vídeo postado no slack, feito pelo instrutor Bernardo. Onde ele resolveu a questão por completo.  

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
