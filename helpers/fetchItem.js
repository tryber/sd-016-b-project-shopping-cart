const fetchItem = (id) => {
  if (!id) throw new Error('You must provide an url');

  const queryUrl = `https://api.mercadolibre.com/items/${id}`;

  return fetch(queryUrl)
    .then((response) => response.json());
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
