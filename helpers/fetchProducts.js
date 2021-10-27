const fetchProducts = (product) => 
  fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${product}`)
    .then((data) => data.json())
    .catch((error) => error);

// function fetchProducts(product) {
//   const cart = document.querySelector('.cart');
//   // const loadingSpan = document.createElement('span');
//   // loadingSpan.classList.add('loading');
//   const loadingSpan = document.querySelector('.loading');
//   loadingSpan.innerText = 'carregando...';
//   cart.appendChild(loadingSpan);
//   const produto = fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${product}`)
//     .then((data) => data.json())
//     .catch((error) => error);
//   loadingSpan.innerText = '';
//   cart.removeChild(loadingSpan);
//   return produto;
// }
if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
