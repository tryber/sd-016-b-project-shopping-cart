const fetchProducts = (par) => {
  // seu código aqui
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${par}`;
  if (!par) {
    throw new Error('You must provide an url');
  }
  const result = fetch(url)
  .then((response) => response.json())
  .then((data) => data.results)
  .catch((error) => `seu erro ${error}`);
  
  return result;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
