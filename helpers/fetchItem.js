const fetchItem = async (itemID) => {
  const URL_ITEMID = `https://api.mercadolibre.com/items/${itemID}`;

  if (itemID) {
    const result = await fetch(URL_ITEMID)
      .then((response) => response.json());
    return result;
  }
  throw new Error('You must provide an url');
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
