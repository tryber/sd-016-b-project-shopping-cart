const fetchProducts = (search) => {
  if (!search) {
   return new Error('You must provide an url');
  }
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${search}`;
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