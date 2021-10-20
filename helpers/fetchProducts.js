const fetchProducts = async (url) => {
  if (!url) {
    throw new Error('You must provide an url');
  }
  return fetch(url)
    .then((response) => response.json())
    .then((item) => item)
    .catch((error) => error);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
