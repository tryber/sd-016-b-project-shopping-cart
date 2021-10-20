const fetchProducts = async (item) => {
   const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${item}`)
   const data = await response.json();
    return data.results;
};

console.log(fetchProducts());

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
