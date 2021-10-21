const fetchProducts = async (argu) => {
  // seu código aqui
  if (argu) {
    const response = await
      fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${argu}`)
        .then((responseFetch) => responseFetch.json())
        .then((data) => data);
    return response;
  }
  return new Error('You must provide an url');
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
