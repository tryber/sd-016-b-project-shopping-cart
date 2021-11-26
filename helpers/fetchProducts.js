/*
Consultei o vídeo do Bernardo Salgueiro, disponibilizado no canal da Turma B, para desenvolver a função fetchProducts.
ref: https://files.slack.com/files-tmb/TMDDFEPFU-F02KATKTLBS-a04e16cc19/primeiro_requisito_-_shopping_cart.mp4
*/

const fetchProducts = (productName) => {
  if (!productName) throw new Error('You must provide an url');

  const endPoint = `https://api.mercadolibre.com/sites/MLB/search?q=${productName}`;

  return fetch(endPoint)
    .then((response) => response.json());
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
