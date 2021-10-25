const fetchProducts = (product) => {
     const dataResult = fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${product}`)
    .then((data) => data.json())
    .catch((error) => error);
    return dataResult;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
