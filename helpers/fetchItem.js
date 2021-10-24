const fetchItem = (id) => {
  const url = `https://api.mercadolibre.com/items/${id}`
  const item = fetch(url)
    .then((response) => response.json())
  return item;  
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
