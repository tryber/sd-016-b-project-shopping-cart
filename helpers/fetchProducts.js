const fetchProducts = async (item) => {
  if (item === '') {
    throw new Error('You must to provide an url');
  }

  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${item}`;
  const itens = await fetch(url)
    .then((response) => response.json())
    .then((data) =>  data.results)
    .catch(() => new Error('You must provide an url'));

  return itens; 
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
