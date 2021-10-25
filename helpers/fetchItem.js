const fetchItem = (ItemID) => {
  const result = fetch(`https://api.mercadolibre.com/items/${ItemID}`)
  .then((response) => response.json())
  .then((data) => console.log(data.id));

  return result;
  // seu código aqui
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
