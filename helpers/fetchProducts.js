const fetchProducts = (search) => 
fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${search}`)
  .then((response) => response.json())
  .then((data) => data)
  .catch((err) => err);

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
