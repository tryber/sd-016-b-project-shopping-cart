const fetchItem = (search) => {
  if (!search) { return 'You must provide an url'; }
  const link = `https://api.mercadolibre.com/items/${search}`;
  return fetch(link)
    .then((response) => response.json())
    .then((data) => data);
};
  
if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
