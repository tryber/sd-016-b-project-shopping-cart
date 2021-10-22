const fetchItem = (productId) => {
  // seu código aqui
  const url = `https://api.mercadolibre.com/items/${productId}`;
  return fetch(url)
  .then((response) => response.json())
  .then((dataJSON) => dataJSON);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
