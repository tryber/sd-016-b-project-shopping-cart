const fetchItem = async (item) => {
  if (!item) {
    throw new Error('You must provide an url');
  }
  return fetch(`https://api.mercadolibre.com/items/${item}`)
  .then((response) => response.json())
  .then((arquivo) => arquivo);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
