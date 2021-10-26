const saveCartItems = (saveItem) => {
  localStorage.setItem('cartItems', saveItem);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
