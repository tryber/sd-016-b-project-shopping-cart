const fetchProducts = async (product) => {
  // seu código aqui
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;

  const fetchData = fetch(url)
    .then((response) => response.json())
    .catch((error) => error);

  return fetchData;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
