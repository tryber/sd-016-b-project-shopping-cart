const idUrl = 'https://api.mercadolibre.com/items/';

const fetchItem = (itemID) => {
  if (!itemID) throw new Error('You must provide and url');
  return fetch(`${idUrl}${itemID}`)
  .then((response) => response.json())
  .then((data) => data)
  .catch((error) => console.log('seu erro é: ', error));
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
