const fetchItem = async (param) => {
  const result = await fetch(`https://api.mercadolibre.com/items/${param}`)
    .then((fullJson) => fullJson.json())
    .catch((error) => `${error}`);
  return result;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
