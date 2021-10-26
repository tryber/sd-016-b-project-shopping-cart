const fetchItem = (itemId) => {
  const selectItem = `https://api.mercadolibre.com/items/${itemId}`;
  return fetch(selectItem).then((response) => response.json());
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
