// const item = require("../mocks/item");

const fetchItem = (itemId) => {
  const promise = fetch(`https://api.mercadolibre.com/items/${itemId}`)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => error);
  return promise;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
