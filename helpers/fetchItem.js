const fetchItem = (id) => {
 const URL = fetch(`https://api.mercadolibre.com/items/${id}`);
 return URL
 .then((response) => response.json())
 .catch((error) => error);
};
if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
