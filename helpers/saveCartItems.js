function saveCartItems(sci) {
  localStorage.setItem('cartItems', sci);
}

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
