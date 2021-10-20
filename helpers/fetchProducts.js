const fetchProducts = async (url) => {
  // seu código aqui
  const fetchLink = `https://api.mercadolibre.com/sites/MLB/search?q=${url}`;
  
  const promise = await fetch(fetchLink);
  const dataJson = await promise.json();

  const ObjectProducts = dataJson.results.map((product) => {
    const createObject = {
      sku: product.id,
      name: product.title,
      image: '',
    };
    return createObject;
  });

  return ObjectProducts;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
