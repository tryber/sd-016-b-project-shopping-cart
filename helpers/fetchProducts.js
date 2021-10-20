const fetchProducts = async (searchParam) => {
  if (searchParam) {
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${searchParam}`;

    const rawData = await fetch(url)
      .then((response) => response.json())
      .then((data) => data);

    return rawData;
  }

  throw Error('You must provide an url');
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
