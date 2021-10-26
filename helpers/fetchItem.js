const fetchItem = (itemSelected) => {
  const currentItem = fetch(`https://api.mercadolibre.com/items/${itemSelected}`)
    .then((response) => response.json())
    .catch((err) => err);
  return currentItem;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
