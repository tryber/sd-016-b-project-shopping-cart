const fetchItem = async (id) => {
  const url = `https://api.mercadolibre.com/items/${id}`;

  const result = await fetch(url)
  .then((response) => response.json())
  .catch(() => new Error('You must provide an url'));
  return result;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
