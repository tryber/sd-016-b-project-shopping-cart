const fetchProducts = async (param) => {
    if (!param) throw new Error('You must provide an url');
    const response = await fetch(param);
    return response.json();
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
