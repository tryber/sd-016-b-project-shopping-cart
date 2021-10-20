const fetchProducts = async () => {
  // seu código aqui
  const response = await 
    fetch('https://api.mercadolibre.com/sites/MLB/search?q=computador')
    .then((responseFetch) => responseFetch.json())
    .then((data) => data.results)
    .catch((error) => console.log(`Algo deu errado :( \n${error}`));
  return response;
};

console.log(typeof fetchProducts);

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
