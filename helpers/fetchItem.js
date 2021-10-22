const fetchItem = async (id) => {
  // seu código aqui
  const url = `https://api.mercadolibre.com/items/${id}`;
  const result = await fetch(url)
    .then((response) => response.json())
    .then((data) => data)
    .catch(() => new Error('You must provide an url'));
  return result;
};

fetchItem('MLB1341706310');

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
