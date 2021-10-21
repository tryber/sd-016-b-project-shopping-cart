const fetchItem = async (ItemID) => {
  const rawData = await fetch(`https://api.mercadolibre.com/items/${ItemID}`);
  const data = await rawData.json();

  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
