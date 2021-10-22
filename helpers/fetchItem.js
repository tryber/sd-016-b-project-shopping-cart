const fetchItem = (ItemID) => {
  // seu código aqui
  const url = `https://api.mercadolibre.com/items/${ItemID}`;

  const result = fetch(url)
    .then((response) => response.json())
    .catch((error) => error);

  return result;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
