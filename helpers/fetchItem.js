const fetchItem = (itemId) => {
  const itemDataPromise = fetch(`https://api.mercadolibre.com/items/${itemId}`)
    .then((response) => response.json())
    .catch((error) => error);

    return itemDataPromise;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
