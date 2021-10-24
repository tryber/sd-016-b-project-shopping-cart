const fetchProducts = async (query) => {
  // seu código aqui
  const URL_ML = 'https://api.mercadolibre.com/sites/MLB/search?q=';

  if (query) {
    const callFetch = await fetch(`${URL_ML}${query}`)
      .then((result) => result.json())
      .then((data) => data);

    return callFetch;
  }
  throw new Error('You must provide an url');
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
