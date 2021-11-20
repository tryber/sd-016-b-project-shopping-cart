const fetchItem = (id) => fetch(`https://api.mercadolibre.com/items/${id}`)
  .then((response) => response.json())
  .then((data) => data)
  .catch((error) => error);

// console.log(fetchItem("MLB1341706310"))

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
