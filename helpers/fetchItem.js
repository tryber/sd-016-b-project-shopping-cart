const fetchItem = async (id) => {
  const url = `https://api.mercadolibre.com/items/${id}`;
  const result = await fetch(url)
  .then((product) => product.json());
  return result;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
