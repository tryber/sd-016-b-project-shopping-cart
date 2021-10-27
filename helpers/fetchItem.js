const fetchItem = (productId) => {
  // seu código aqui
  if (!productId) {
    throw new Error('You must provide an url.');
  }
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
