const saveCartItems = (html) => {
  localStorage.setItem('cartItems', html);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
