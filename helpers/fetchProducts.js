const fetchProducts = async (item) => {
  const computerItens = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${item}`)
    .then((res) => res.json())
    .catch(() => new Error('You must provide an url'));
    return computerItens;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
