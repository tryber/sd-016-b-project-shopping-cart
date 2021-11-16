const fetchItem = (itemId) => {
  const url = `https://api.mercadolibre.com/items/${itemId}`;
  const result = fetch(url)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => error);
  return result; 
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
