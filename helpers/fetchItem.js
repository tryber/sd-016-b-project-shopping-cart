const fetchItem = async (ItemID) => {
  if (!ItemID) {
    throw new Error('You must provide an id');
  }

  const rawData = await fetch(`https://api.mercadolibre.com/items/${ItemID}`);
  const data = await rawData.json();

  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
