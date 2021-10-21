const saveCartItems = (content) => {
  return localStorage.setItem('cartItems', content);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
