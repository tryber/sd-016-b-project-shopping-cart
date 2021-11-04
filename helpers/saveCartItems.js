const saveCartItems = (itensCarrinho) => {
  localStorage.setItem('carrinho', itensCarrinho);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
