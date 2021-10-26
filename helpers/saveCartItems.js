const saveCartItems = (savedItem) => localStorage.setItem('cartItems', savedItem);

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
