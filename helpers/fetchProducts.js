const fetchProducts = () => {
  const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    const responseF = () => (
      fetch(url)
      .then((response) => response.json())
      .then((data) => data.value)
      .catch((error) => console.log(error))
    );
    return responseF;
  };

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
