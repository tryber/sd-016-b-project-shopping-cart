const fetchProducts = async (parametro) => 
  fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${parametro}`)
  .then((response) => response.json())
  .then((arquivo) => arquivo)
  .catch((error) => error);

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
