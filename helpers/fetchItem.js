const fetchItem = async (itemID) => {
  const item = await fetch(`https://api.mercadolibre.com/items/${itemID}`)
    .then((response) => response.json())
    .then((data) => data);

  return item;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
