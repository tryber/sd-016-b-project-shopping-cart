const fetchItem = (id) => {
  if (id === undefined) throw new Error('You must provide an url');
  const result = fetch(`https://api.mercadolibre.com/items/${id}`)
    .then((response) => response.json());
  return result;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
