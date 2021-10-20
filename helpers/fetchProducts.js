const fetchProducts = async (category) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${category}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
  } catch (error) {
    return `Algo deu errado :( \n ${error}`;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
