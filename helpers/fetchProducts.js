const fetchProducts = (product) => {
const URL = fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${product}`);
 return URL
 .then((response) => response.json())
 .catch((error) => error);
};
if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
