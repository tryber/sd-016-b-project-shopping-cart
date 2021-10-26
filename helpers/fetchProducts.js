const fetchProducts = async (query) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;

  const listProducts = await fetch(url)
    .then((response) => response.json())
    // .then((data) => data.results) irei utilizar na função do script como chave do meu objeto.
    .catch(() => new Error('You must provide an url'));
  return listProducts;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
