const fetchProducts = (item) => {
  if (!item) {
    throw new Error('You must provide an url');
  }
  
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${item}`;
  const itens = fetch(url)
    .then((response) => response.json())
    .then((data) => data.results)
    .catch((error) => error = new Error('You must provide an url'));

  return itens; 
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
