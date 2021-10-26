const saveCartItems = (cartList) => {
  // seu código aqui
  localStorage.setItem('cartItems', cartList);
  // localStorage.removeItem(cartList);
  // localStorage.clear(); // apaga tudo quando atualiza
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
