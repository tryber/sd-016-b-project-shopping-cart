const fetchProducts = (QUERY = 'computador') => {
const url = `https://api.mercadolibre.com/sites/MLB/search?q=${QUERY}`;

return fetch(url)
  .then((response) => response.json())
  .then((data) => data.results)
  .catch(() => new Error('You must provide an url'));
};

// const fetchProducts = async () => {
//   const result = await fetch(url)
//     .then((response) => response.json())
//     .then((data) => data.results)
//     .catch((error) => console.log(error));
//     return result;
//   };
  
if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
