const fetchProducts = (product) => {
  const dataPromise = fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${product}`)
    .then((response) => response.json())
    .catch((error) => error);

    return dataPromise;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
