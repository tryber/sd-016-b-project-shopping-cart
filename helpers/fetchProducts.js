const fetchProducts = (product) => {
  // seu código aqui
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => console.log(data));
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
