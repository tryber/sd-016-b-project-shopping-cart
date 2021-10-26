const saveCartItems = (item) => localStorage.setItem('cartItems', item);

// fonte de pesquisa: https://developer.mozilla.org/pt-BR/docs/Web/API/Storage/setItem

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
