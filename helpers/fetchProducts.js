const fetchProducts = async (url) => {
  const fetchLink = `https://api.mercadolibre.com/sites/MLB/search?q=${url}`;

  const promise = await fetch(fetchLink);
  const dataJson = await promise.json();

  return dataJson;
};
 
if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
