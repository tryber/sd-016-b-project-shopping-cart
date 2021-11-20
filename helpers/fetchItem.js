const fetchItem = async (itemId) => {
  try {
    const itemRequest = await fetch(`https://api.mercadolibre.com/items/${itemId}`);
    const dataItem = itemRequest.json();
    return dataItem;
  } catch (error) {
    throw new Error('You must provide an url');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
