const fetchItem = (id) => {
  fetch(`https://api.mercadolibre.com/items/${id}`)
  .then((response) => response.json())
  .then((data) => data)
  .catch(() => alert('error: algo de ruim não está bom'));
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
