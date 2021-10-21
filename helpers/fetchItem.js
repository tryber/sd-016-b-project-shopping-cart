const fetchItem = (itemId) => {
  if (itemId === undefined) {
    throw new Error('You must provide an url');
  }

  return fetch(`https://api.mercadolibre.com/items/${itemId}`)
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => console.log(err));
};
fetchItem('MLB1341706310');
if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
