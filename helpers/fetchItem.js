const fetchItem = (itemID) => 
  // seu código aqui
  fetch(`https://api.mercadolibre.com/items/${itemID}`)
  .then((data) => data.json())
  .then((item) => item)
  .catch((error) => error);

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
