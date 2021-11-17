const fetchProducts = (item) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${item}`;
    fetch(url)
    .then((response) => response.json())
    .catch((error) => error);
};

// console.log(fetchProducts('computador'));

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
