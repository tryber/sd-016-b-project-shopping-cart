const fetchItem = (ids) => {
  // seu código aqui
  if (!ids) {
    throw new Error('You must provide an url');
  }
  const url = `https://api.mercadolibre.com/items/${ids}`;
  const result = fetch(url)
  .then((response) => response.json())
  .then((data) => {
    const { id, title, price } = data;
    return { sku: id, name: title, salePrice: price };
  })
  .catch((error) => `seu erro é ${error}`);
  return result;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
