const fetchItem = (id) => {
  // seu código aqui
  const res = fetch(`https://api.mercadolibre.com/items/${id}`)
  .then((response) => response.json())
  .catch((error) => error);
  return res;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
