const saveCartItems = (itensCarrinho) => localStorage.setItem('cartItems', itensCarrinho);

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
