const fetchItem = async (item) => {
  const url = `https://api.mercadolibre.com/items/${item}`;
  
  const searchId = await fetch(url);
  const dataId = await searchId.json();

  return dataId;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
