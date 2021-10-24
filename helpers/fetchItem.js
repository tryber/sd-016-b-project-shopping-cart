const fetchItem = async (itemID) => {
 const url = `https://api.mercadolibre.com/items/${itemID}`;
 const specificItem = await fetch(url)
    .then((response) => response.json());
    return specificItem;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
