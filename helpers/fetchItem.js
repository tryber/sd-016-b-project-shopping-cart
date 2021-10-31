const fetchItem = (id) => fetch(`https://api.mercadolibre.com/items/${id}`)
.then((response) => response.json())
  .then((data) => data)
    .catch((erro) => erro);

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
