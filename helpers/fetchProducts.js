const fetchProducts = () => {
  const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
  const itens = fetch(url)
    .then((response) => response.json())
    .then((data) => data.results)
    .catch((error) => error.toString());
  
  return itens  
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
