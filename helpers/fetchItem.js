const fetchItem = async (val) => {
  if (!val) {
    throw new Error('You must provide an url');
  }
  return fetch(`https://api.mercadolibre.com/items/${val}`)
    .then((response) => response.json())
    .then((item) => item);
  // .catch((error) => error);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
