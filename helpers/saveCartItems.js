const saveCartItems = (save) => localStorage
  .setItem('cartItems', save.innerHTML);

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
