const fetchProducts = (query) => {
  fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`)
    .then((promise) => promise.json()
      .then((data) => render(data)))
    .catch((err) => console.log(err.message));
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
