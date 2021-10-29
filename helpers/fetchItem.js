const fetchItem = async (item) => {
  const API_URL = `https://api.mercadolibre.com/items/${item}`;

  if (!item) {
    return new Error('You must provide an url');
  }

  const response = await fetch(API_URL);
  return response.json();
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
