const fetchItem = (ItemID) => {
  const result = fetch(`https://api.mercadolibre.com/items/${ItemID}`)
  .then((response) => response.json())
  .then((data) => data.id)
  .catch(() => new Error('You must provide url'));

  return result;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
