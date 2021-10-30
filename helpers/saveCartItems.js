const saveCartItems = (params) => localStorage.setItem('cartItems', params);

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
