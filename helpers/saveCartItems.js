const saveCartItems = (valueCart) => {
  localStorage.setItem('cartItems', valueCart);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
