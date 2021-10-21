// 2. Adicione o produto ao carrinho de compras
// Cada produto na página HTML possui um botão com o nome Adicionar ao carrinho!.
// Ao clicar nesse botão você deve realizar uma requisição. Para isso, acesse o arquivo fetchItem.js, que se encontra dentro da pasta helpers. Lá, você deverá implementar apenas a função fetchItem.
// A função fetchItem que você irá implementar, deve consumir o seguinte endpoint:
// "https://api.mercadolibre.com/items/$ItemID"
// onde $ItemID deve ser o valor id do item selecionado.
const fetchItem = (itemID) => fetch(`https://api.mercadolibre.com/items/${itemID}`)
  .then((response) => response.json())
  .then((data) => data)
  .catch((error) => (error));

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
