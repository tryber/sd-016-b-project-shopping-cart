const fetchProducts = async (pesquisa = 'computador') => {
  const dados = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${pesquisa}`)
    .then((response) => response.json())
    .then((data) => data);

  return dados.results;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
