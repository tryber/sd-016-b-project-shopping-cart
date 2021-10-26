const fetchProducts = async (product) => {
const result = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${product}`)
     .then((response) => response.json())
     .then((data) => data.results)
     .catch(() => new Error('You must provide url'));
     return result;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
