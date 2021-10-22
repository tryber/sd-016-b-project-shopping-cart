// refazendo sem o try catch
const fetchItem = async (itemID) => {
  const awaitFetch = await fetch(`https://api.mercadolibre.com/items/${itemID}`);
  const result = await awaitFetch.json();
  return awaitFetch;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
