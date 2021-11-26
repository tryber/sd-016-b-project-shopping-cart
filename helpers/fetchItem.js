const fetchItem = (id) => {
  if (!id) throw new Error('You must provide an url');

  const endpoint = `https://api.mercadolibre.com/items/${id}`;

  return fetch(endpoint)
    .then((response) => response.json());
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
