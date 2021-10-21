const fetchProducts = async (param) => {
  const result = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${param}`)
    .then((fulljson) => fulljson.json())
    .catch((error) => `${error}`);
  return result;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
