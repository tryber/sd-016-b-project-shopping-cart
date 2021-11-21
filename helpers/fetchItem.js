const fetchItem = (ItemID) => fetch(`https://api.mercadolibre.com/items/${ItemID}`)
.then((data) => data.json())
.catch((error) => error);

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}