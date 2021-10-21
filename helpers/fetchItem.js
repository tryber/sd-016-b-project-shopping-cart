const fetchItem = (itemId) => {
  const API_URL = `https://api.mercadolibre.com/items/${itemId}`;

  return fetch(API_URL)
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
