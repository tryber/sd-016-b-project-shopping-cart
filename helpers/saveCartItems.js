const saveCartItems = (callback) => {
  localStorage.setItem('cartItems', callback);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
