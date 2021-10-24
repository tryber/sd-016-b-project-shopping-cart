const fetchItem = async (itemID) => {
  const urlID = `https://api.mercadolibre.com/items/${itemID}`;

  const result = await fetch(urlID)
  .then((data) => data.json())
  .catch(() => new Error('You must provide an url'));
  return result;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
