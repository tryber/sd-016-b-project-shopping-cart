const fetchItem = async (itemID) => {
  const API_URL = `https://api.mercadolibre.com/items/${itemID}`;

  if (itemID === undefined) {
    throw new Error('You must provide an url');
  }
  
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
