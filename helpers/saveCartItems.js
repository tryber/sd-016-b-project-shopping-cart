const saveCartItems = (val) => localStorage.setItem('cartItems', val);

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}