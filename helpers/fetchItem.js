const fetchItem = async (itemID) => {
  const url = `https://api.mercadolibre.com/items/${itemID}`;

  const idProduct = await fetch(url)
  .then((response) => response.json())
  .catch(() => new Error('You must provide an url'));
  return idProduct;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
