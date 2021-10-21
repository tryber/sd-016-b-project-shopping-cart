const fetchItem = async (id) => {
  const queryUrl = `https://api.mercadolibre.com/items/${id}`;
  return fetch(queryUrl)
    .then((response) => response.json());
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
