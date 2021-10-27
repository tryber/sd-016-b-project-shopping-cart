const fetchProducts = (product) => {
  // seu código aqui
  if (!product) {
    throw new Error('You must provide an url.');
  }
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
  return fetch(url)
    .then((response) => response.json())
    .then((JSONdata) => JSONdata);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
