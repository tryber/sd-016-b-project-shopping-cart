const fetchItem = async (argument) => {
  if (!argument) {
    throw new Error('You must provide an URL.');
  }
  const url = `https://api.mercadolibre.com/items/${argument}`;
  const data = await fetch(url);
  const jsonData = data.json();
  return jsonData;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
