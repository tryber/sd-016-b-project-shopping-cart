const fetchItem = async (ItemID) => {
  try {
  const itemUrl = await fetch(`https://api.mercadolibre.com/items/${ItemID}`)
  return await itemUrl.json();
} catch (error) {
  return error;
}
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
