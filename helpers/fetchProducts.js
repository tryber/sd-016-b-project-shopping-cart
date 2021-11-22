const fetchProducts = async (product) => {
  if (product === undefined) throw new Error('mensagem esperada aqui');
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data.results);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
