const fetchItem = (param) => {
  if (!param) { return 'You must provide an url'; }
  const link = `https://api.mercadolibre.com/items/${param}`;
  return fetch(link)
  .then((response) => response.json())
  .then((data) => data);
  };

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
