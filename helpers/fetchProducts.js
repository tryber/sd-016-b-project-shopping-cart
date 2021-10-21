// 1. Crie uma listagem de produtos
// Você deve criar uma listagem de produtos que devem ser consultados através da API do Mercado Livre.
// Para isso, você terá de implementar a função fetchProducts que já está criada no arquivo fetchProducts.js que se encontra dentro da pasta helpers. Mas atenção, dentro do arquivo fetchProducts.js deve ser implementada apenas a função fetchProducts.
// A função fetchProducts que você irá implementar, deve consumir o seguinte endpoint:
// "https://api.mercadolibre.com/sites/MLB/search?q=$QUERY"
// Onde $QUERY deve ser o valor da sua busca. Para este trabalho, a busca deve ser obrigatoriamente o termo computador.
// O retorno desse endpoint será algo no formato json
const fetchProducts = (item) => fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${item}`)
  .then((response) => response.json())
  .then((dataJSON) => dataJSON)
  .catch((error) => (error));

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
