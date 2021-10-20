const fetchProducts = async () => {
  const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';

  const results = await fetch(url)
  .then((response) => response.json())
  .then((data) => data.json())
  .catch((error) => console.log(error));
  return results;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}

// console.log(fetchProducts());  para ver retorno.