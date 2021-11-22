const fetchItem = (ItemID) => {
  // seu código aqui
  const endPoint = `https://api.mercadolibre.com/items/${ItemID}`;
  return fetch(endPoint)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => error);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
