const fetchItem = async (id) => {
  const urlProduct = `https://api.mercadolibre.com/items/${id}`;
  const item = await fetch(urlProduct)
    .then((response) => response.json())
    .catch(() => new Error('You must provide an url'));
  return item;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
