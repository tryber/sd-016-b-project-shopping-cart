const fetchItem = (itemId) => 
  fetch(`https://api.mercadolibre.com/items/${itemId}`)
    .then((response) => response.json())
      .then((response) => response)
        .catch((error) => error);

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
