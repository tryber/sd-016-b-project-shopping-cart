const fetchProducts = async (item) => {
  const dataResult = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${item}`)
    .then((res) => res.json())
    .catch(() => new Error('You must provide an url'));
    return dataResult;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
