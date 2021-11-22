const fetchItem = (item) => {
  const url = `https://api.mercadolibre.com/items/${item}`;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
