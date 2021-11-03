const fetchItem = (item) => {
  if (!item) {
    return new Error('You must provide an url');
   }
  const url = `https://api.mercadolibre.com/items/${item}`;
  return fetch(url) 
    .then((response) => response.json());
    };
if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
