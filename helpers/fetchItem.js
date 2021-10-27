const fetchItem = async (itemID) => {
  if (!itemID) {
    return new Error('You must provide an url');
  }
  const item = await fetch(`https://api.mercadolibre.com/items/${itemID}`)
    .then((data) => data.json());
  
  return item;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}