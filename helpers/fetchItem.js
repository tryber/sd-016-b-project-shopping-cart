const { results } = require("../mocks/search");

const fetchItem = (item) => {
  return fetch(`https://api.mercadolibre.com/items/${item}`)
    .then((dataItem) => dataItem.json())
    .catch((error) => error);
    
};

// console.log(fetchItem('MLB1341706310'));

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
