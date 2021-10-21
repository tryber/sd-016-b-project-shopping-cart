const fetchProducts = async (query) => {
  // seu código aqui * alterações efetuadas para satisfazer o requisito *
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;

    const results = await fetch(url)
    .then((response) => response.json())
    .catch(() => new Error('You must provide a url'));
    return results;
  };

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
