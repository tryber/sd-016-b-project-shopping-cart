const fetchItem = (sku) => {
  return fetch(`https://api.mercadolibre.com/items/${sku}`)
    .then(response => response.json())
    .catch(error => error)
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
