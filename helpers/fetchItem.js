const fetchItem = async (itemID) => {
  if (itemID === 'undefined') {
    throw new Error('You must provide an url');
  }
  return fetch(`https://api.mercadolibre.com/items/${itemID}`)
  .then((response) => response.json());
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
