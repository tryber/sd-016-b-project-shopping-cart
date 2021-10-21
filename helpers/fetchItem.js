const API_URL = 'https://api.mercadolibre.com/items/';

const fetchItem = (itemID) => {
  if (!itemID) throw new Error('You must provide and url');
  return fetch(`${API_URL}${itemID}`)
  .then((response) => response.json)
  .then((data) => data)
  .catch((error) => console.log('seu erro é: ', error));
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
