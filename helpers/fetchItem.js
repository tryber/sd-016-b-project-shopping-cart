const fetchItem = (id) => {
  const endpoint = `https://api.mercadolibre.com/items/${id}`;
  
  return fetch(endpoint)
    .then((response) => response.json());
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
