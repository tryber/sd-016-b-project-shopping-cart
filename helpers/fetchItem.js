const fetchItem = async (itemID) => {
  const url = `https://api.mercadolibre.com/items/${itemID}`;
  const item = await fetch(url)
    .then((response) => response.json());
    return item;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
