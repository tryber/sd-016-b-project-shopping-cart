const saveCartItems = (cartList) => {
  // seu código aqui
  // localStorage.clear();
  localStorage.setItem('cartItems', cartList);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
