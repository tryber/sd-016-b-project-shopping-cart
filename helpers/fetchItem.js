const fetchId = (item) => `https://api.mercadolibre.com/items/${item}`;

const fetchItem = (callback) => {
  const nameUrl = fetchId(callback);
  return fetch(nameUrl)
    .then((response) => response.json())
    .then((data) => data);
};
// fetchItem('MLB1341706310');

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
