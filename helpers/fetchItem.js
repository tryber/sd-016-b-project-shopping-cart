const fetchItem = (item) => {
  // seu código aqui
  const URL = `https://api.mercadolibre.com/items/${item}`;

  return fetch(URL)
    .then((responde) => responde.json())
    .then((data) => data)
    .catch(() => new Error('You must provide an url'));
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
