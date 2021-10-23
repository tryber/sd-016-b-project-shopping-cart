const fetchItem = (id) => {
  const fetchResults = fetch(`https://api.mercadolibre.com/items/${id}`)
    .then((response) => response.json())
    .catch((error) => error);
  return fetchResults; 
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
