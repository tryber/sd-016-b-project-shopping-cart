const fetchProducts = async (param) => {
  // seu código aqui [está retornando o array results]
  if (typeof param !== typeof '') {
    return new Error('You must provide an url');
  }
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${param}`;
    const result = await fetch(url)
      .then((response) => response.json())
      .then((data) => data);
      return result;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
