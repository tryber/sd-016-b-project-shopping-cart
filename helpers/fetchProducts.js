const fetchProducts = (product) => {
  // seu código aqui
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
  return fetch(url)
    .then((response) => response.json())
    .then((JSONdata) => JSONdata.results);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
