const fetchProducts = (item) => {
  // seu código aqui
  const URL = `https://api.mercadolibre.com/sites/MLB/search?q=${item}`;

  return fetch(URL)
    .then((responde) => responde.json())
    .then((data) => data)
    .catch(() => new Error('You must provide an url'));
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
