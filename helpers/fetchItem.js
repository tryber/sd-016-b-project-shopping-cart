const fetchItem = (itemID) => {
  const result = fetch(`https://api.mercadolibre.com/items/${itemID}`)
    .then((response) => response.json())
    .catch((error) => error);

    return result;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
