const fetchProducts = async (paramLink) => {
  // seu código aqui
  const URL_ML = 'https://api.mercadolibre.com/sites/MLB/search?q=';

  const teste = await fetch(`${URL_ML}${paramLink}`)
    .then((result) => result.json())
    .then((data) => data)
    .catch((error) => `Erro apresentado: ${error}`);

  return teste;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
