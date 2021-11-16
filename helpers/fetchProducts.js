const fetchProducts = (prdc) => fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${prdc}`)
  .then((data) => data.json())
  .catch((error) => error);

  if (typeof module !== 'undefined') {
    module.exports = {
      fetchProducts,
    };
  }