const fetchProducts = (param) => {
  // if (param === undefined) throw new Error('You must provide an url');
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${param}`;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data);
};

if (typeof module !== 'undefined') {  
  module.exports = {
    fetchProducts,
  };
}
