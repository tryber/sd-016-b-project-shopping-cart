const fetchItem = (itemId) => (
  fetch(`https://api.mercadolibre.com/items/${itemId}`)
    .then((response) => response.json())
);

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
