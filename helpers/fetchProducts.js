const fetchProducts = (product) => 
  // seu código aqui
   fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${product}`)
    .then((data) => data.json())
    .catch((error) => error);
    
if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}

// const fetchProducts = (url) => {
//   // seu código aqui
//   fetch(url)
//   .then((response) => response.json())
//   .then((data) => data.results)
//   .catch((error) => console.log('Seu erro é', error));
// };const fetchProducts = (url) => {
//   // seu código aqui
//   fetch(url)
//   .then((response) => response.json())
//   .then((data) => data.results)
//   .catch((error) => console.log('Seu erro é', error));
// };