const saveCartItems = (element) => {
  localStorage.clear();
  localStorage.setItem('cartItems', element);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
