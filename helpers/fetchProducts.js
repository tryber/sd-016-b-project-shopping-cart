const fetchProducts = (argumento) => {
  if (!argumento) {
    throw new Error('You must provide an url');
  } 
  const pesquisa = argumento;
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${pesquisa}`;
  return fetch(url)
    .then((computador) => computador.json());
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
