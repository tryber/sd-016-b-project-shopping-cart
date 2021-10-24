const fetchProducts = async (searchTerm) => {
  if (!searchTerm) throw new Error('You must provide an url');
  const res = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${searchTerm}`);
  return res.json();
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
