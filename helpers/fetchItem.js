const fetchItem = async (id) => {
  if (id === undefined) {
    return 'You must provide an url';
  }
  const search = await fetch(`https://api.mercadolibre.com/items/${id}`);
  const result = await search.json();
  return result;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
