const fetchItem = async (productId) => {
  const url = `https://api.mercadolibre.com/items/${productId}`;
  const productReturned = await fetch(url)
  .then((response) => response.json())
  .catch(() => new Error('You must provide an url'));
  return productReturned;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
