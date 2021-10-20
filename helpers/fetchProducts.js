const fetchProducts = async (url) => {
  if (!url) throw new Error('You must provide an url');
  const res = await fetch(url);
  return res.json();
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
