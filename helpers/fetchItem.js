const fetchItem = (products) => {
  if (!fetchItem) { 
    throw new Error('You must provide an url'); 
}
  return fetch(`https://api.mercadolibre.com/items/${products}`)
  .then((response) => response.json())
  .then((data) => data);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
