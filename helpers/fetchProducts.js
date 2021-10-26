const fetchProducts = async (pesquisa) => {
  if (pesquisa === undefined) {
    return new Error('You must provide an url');
  }
  
  const dados = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${pesquisa}`)
    .then((response) => response.json())
    .then((data) => data);
  
    return dados;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
