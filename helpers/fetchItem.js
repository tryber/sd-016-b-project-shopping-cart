const fetchItem = async (id) => {
  if (typeof id !== typeof '') {
    return new Error('You must provide an url');
  }
    const url = `https://api.mercadolibre.com/items/${id}`;
    const result = await fetch(url)
    .then((response) => response.json())
    .then((data) => data);
    return result;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
