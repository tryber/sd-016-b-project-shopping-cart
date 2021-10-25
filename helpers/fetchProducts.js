const fetchProducts = async (arg) => {
  if (undefined) {
    throw new Error('You must provide an url');
  }
  const products = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${arg}`)
    .then((response) => response.json());
    // .then((jsonResponse) => jsonResponse.result);  
    // console.log(products);
    return products;
};
//  fetchProducts();

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
