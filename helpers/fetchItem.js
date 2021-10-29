const idUrl = 'https://api.mercadolibre.com/items/';

const fetchItem = (itemID) => fetch(`${idUrl}${itemID}`)
  .then((response) => response.json())
  .then((data) => data)
  .catch((error) => error);

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
