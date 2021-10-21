const saveCartItems = (param) => localStorage.setItem('carrinho', param);

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
