const saveCartItems = (cartList) => {
  // seu código aqui
  // localStorage.removeItem('cartitem');
  localStorage.setItem('cartItems', cartList);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
