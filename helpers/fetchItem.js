const fetchItem = async (id) => {
  if (!id) {
    throw new Error('You must provide an url');
  }

  return fetch(`https://api.mercadolibre.com/items/${id}`)
  .then((response) => response.json())
  .then((data) => data);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
