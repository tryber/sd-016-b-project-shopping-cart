const saveCartItems = (list) => {
  return localStorage.setItem('cartItems', list);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
