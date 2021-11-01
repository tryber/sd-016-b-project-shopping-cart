const fetchItem = (ItemID) => {
  // seu código aqui
  fetch(`https://api.mercadolibre.com/items/${ItemID}`)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => error);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
