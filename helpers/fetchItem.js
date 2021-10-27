const fetchItem = (computerId) => fetch(`https://api.mercadolibre.com/items/${computerId}`)
    .then((promise) => promise.json())
    .catch((error) => error);

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}