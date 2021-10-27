const saveCartItems = (sItems) => {
  localStorage.setItem('cartItems', `${sItems}`);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
