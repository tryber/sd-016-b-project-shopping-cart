const fetchItem = (searchedProduct) => 
  fetch(`https://api.mercadolibre.com/items/${searchedProduct}`)
    .then((response) => response.json())
    .catch((error) => error);
//

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
