const getSavedCartItems = () => localStorage.getItem('cartItems');

// fonte de pesquisa: https://developer.mozilla.org/pt-BR/docs/Web/API/Storage/getItem

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
