const fetchProducts = (param) => {
  if (!param) { return 'You must provide an url'; }
        const link = `https://api.mercadolibre.com/sites/MLB/search?q=${param}`;
        return fetch(link)
        .then((response) => response.json()
        .then((data) => data.results));
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
