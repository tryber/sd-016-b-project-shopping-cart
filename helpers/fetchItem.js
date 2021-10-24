const fetchItem = (products) => {
  return fetch(`https://api.mercadolibre.com/items/${products}`)
  .then((response) => response.json())
  .then((data) => data);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
