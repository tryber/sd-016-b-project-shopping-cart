const fetchItem = (productID) => {
  const URL = `https://api.mercadolibre.com/items/${productID}`;

  const getFetch = fetch(URL)
    .then((response) => response.json())
    .catch(() => new Error('You must provide an url'));
    
  return getFetch;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
