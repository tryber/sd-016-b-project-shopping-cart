const fetchProducts = async (api) => {
  if (!api) {
    throw new Error('You must provide an url');
  }

  return fetch(api)
    .then((response) => response.json())
    .then((data) => data);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
