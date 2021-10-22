const fetchItem = (argument) => {
  const url = `https://api.mercadolibre.com/items/${argument}`;
  const data = await fetch(url);
  const jsonData = data.json();
  return jsonData
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
