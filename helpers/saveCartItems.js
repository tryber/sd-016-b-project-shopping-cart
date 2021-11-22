const saveCartItems = (text) => {
  localStorage.setItem('cartItems', text);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
