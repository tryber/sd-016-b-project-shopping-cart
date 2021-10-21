const fetchItem = (productID) => {
  const specificItem = fetch(`https://api.mercadolibre.com/items/${productID}`)
    .then((response) => response.json())
    .catch(() => new Error('You must provide an url'));
  return specificItem;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
