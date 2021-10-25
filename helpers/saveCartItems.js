const saveCartItems = (save) => localStorage
  .setItem('cartItems', save);

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
