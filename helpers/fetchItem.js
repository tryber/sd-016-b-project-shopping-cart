const fetchItem = (itemID) => {
  const product = fetch(`https://api.mercadolibre.com/items/${itemID}`)
    .then((res) => res.json())
    .catch(() => new Error('You must provide an url'));
    return product;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
