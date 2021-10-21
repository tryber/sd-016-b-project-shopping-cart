const fetchProducts = async (item) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${item}`;
  const itensComputador = await fetch(url)
    .then((response) => response.json())
    // .then((data) => data.results)
    .catch(() => new Error('You must provide an url'));
  return itensComputador;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
