const fetchProducts = async (url) => {
  // seu código aqui
  if (!url) {
    throw new Error ('You must provide an url')
  }
  
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => error) 
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
