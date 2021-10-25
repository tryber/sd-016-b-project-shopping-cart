const fetchItem = (id) => 
  fetch(`https://api.mercadolibre.com/items/${id}`)
    .then((dataItem) => dataItem.json())
    .catch((error) => error);

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
