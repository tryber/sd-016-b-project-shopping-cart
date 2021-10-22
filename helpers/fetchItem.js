const getUrl = (url) => `https://api.mercadolibre.com/items/${url}`

const fetchItem = (url) => {
  const id = getUrl(url)
  return fetch(id)
  .then((response) => response.json())
  .then((data) => data)
};


if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
