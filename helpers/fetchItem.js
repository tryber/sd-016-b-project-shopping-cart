// refazendo sem o try catch
const fetchItem = async (itemID) => {
  const url = `https://api.mercadolibre.com/items/${itemID}`;
  const item = await fetch(url)
    .then((response) => response.json())
    .catch(() => new Error('You must provide an url'));
  return item;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
