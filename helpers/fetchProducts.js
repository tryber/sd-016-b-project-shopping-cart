const fetchProducts = (search) => {
  const urlText = `https://api.mercadolibre.com/sites/MLB/search?q=${search}`;
  return fetch(urlText)
    .then((response) => response.json())    
    .catch((error) => error);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
