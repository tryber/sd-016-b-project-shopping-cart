const fetchItem = (ItemID) => {
  const result = fetch(`https://api.mercadolibre.com/items/${ItemID}`)
  .then((response) => response.json())
  .catch(() => new Error('You must provide url'));

  return result;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
