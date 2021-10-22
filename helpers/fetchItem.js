const fetchItem = (id) => {
  if (!id) throw new Error('You must provide an url');
  return fetch(`https://api.mercadolibre.com/items/${id}`).then((r) => r.json());
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
