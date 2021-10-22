const fetchItem = async (itemID) => {
  if (itemID) {
    const item = await fetch(`https://api.mercadolibre.com/items/${itemID}`)
    .then((response) => response.json())
    .then((data) => data);

    return item;
  }

  throw Error('You must provide an url');
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
