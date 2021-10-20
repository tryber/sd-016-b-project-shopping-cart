const fetchProducts = (query) => {
  if (!query) {
    throw new Error('You must provide an url');
  }

  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;

  return fetch(url)
    .then((result) => result.json())
    .catch(() => { });

};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
