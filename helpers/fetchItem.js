const fetchItem = (id) => {
  fetch(`https://api.mercadolibre.com/items/${id}`)
  .then((resp) => resp.json())
  .then((data) => data)
  .catch((err) => err);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
