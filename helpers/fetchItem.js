const fetchItem = (itemId) => fetch(`https://api.mercadolibre.com/items/${itemId}`)
    .then((promise) => promise.json())
    // .then((data) => data)
    .catch((error) => error);

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}

// console.log(fetchItem('MLB1341706310'));