const fetchItem = async (item) => {
  if (!item) throw new Error('You must provide an url');
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
