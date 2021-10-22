const fetchItem = (query) => {
  if (!query) {
    throw new Error('You must provide an url');
  }

  return fetch(`https://api.mercadolibre.com/items/${query}`)
    .then((result) => result.json());
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
