const fetchProducts = (search) => 
  fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${search}`)
    .then((response) => response.json())
      .then((response) => response)
        .catch((error) => error);

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
