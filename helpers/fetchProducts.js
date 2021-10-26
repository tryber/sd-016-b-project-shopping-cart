const fetchProducts = async (product) => {
  // seu código aqui
  // return fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${product}`)
  //   .then((data) => data.json())
  //   .catch((error) => error);

  if (product === undefined) {
    return new Error('You must provide an url');
  }

  const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${product}`);
  const data = await response.json();
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
