const saveCartItems = (s) => {
  localStorage.setItem('cartItems', s );
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
