const fetchProducts = async (item) => {
  // seu código aqui
  if (item !== undefined) {
    const result = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${item}`)
      .then((response) => response.json());
    return result;
  }

  throw new Error('You must provide an url');
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
