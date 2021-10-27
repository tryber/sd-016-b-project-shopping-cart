const fetchItem = (idItem) => {
  if (!idItem) throw new Error('You must provide an url');

  const url = `https://api.mercadolibre.com/items/${idItem}`;

  return fetch(url).then((response) => response.json());
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
