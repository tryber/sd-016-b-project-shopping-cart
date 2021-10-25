const fetchItem = async (item) => 
  fetch(`https://api.mercadolibre.com/items/${item}`)
  .then((response) => response.json())
  .then((arquivo) => arquivo)
  .catch((error) => error);

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
