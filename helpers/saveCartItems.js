const saveCartItems = (saveCart) => {
  // seu código aqui
  localStorage.setItem('cartItems', saveCart);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
