const fetchItem = async (val) => {
  if (!val) {
    throw new Error('You must provide an url');
  }
  return fetch(`https://api.mercadolibre.com/items/${val}`)
    .then((response) => response.json())
    .then((data) => data);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
