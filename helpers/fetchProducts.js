const apiML = 'https://api.mercadolibre.com/sites/MLB/search?q=';
const fetchProducts = async (query) => {
  if (query) {
    return fetch(`${apiML}${query}`)
      .then((promise) => promise.json()
        .then((data) => data));
  }
  throw new Error('You must provide an url');
};

// primeiro script que foi modificado por conta do test que não consegui usar o .catch
// const fetchProducts = (query) => fetch(`${apiML}${query}`)
//     .then((promise) => promise.json()
//       .then((data) => data.results))
//     .catch((Error) => Error);

if (typeof module !== 'undefined') module.exports = fetchProducts;
