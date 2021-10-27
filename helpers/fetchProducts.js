const itemUrl = (query) => `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;

const fetchProducts = (item) => {
  const url = itemUrl(item);
  return fetch(url)
  .then((response) => response.json())
  .then((data) => data)
  .catch(() => new Error('You must provide an url'));
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
