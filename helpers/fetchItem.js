const fetchItem = (itemId) => {
  if (!itemId) throw new Error('You must provide an url');
  const selectItem = `https://api.mercadolibre.com/items/${itemId}`;
  return fetch(selectItem).then((response) => response.json());
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
