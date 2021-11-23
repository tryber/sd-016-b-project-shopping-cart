const fetchItem = (argumento) => {
  if (!argumento) {
    throw new Error('You must provide an url');
  } 
  const pesquisa = argumento;
  const url = `https://api.mercadolibre.com/items/${pesquisa}`;
  return fetch(url)
    .then((computador) => computador.json());
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
