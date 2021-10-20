const saveCartItems = (OL) => {
  localStorage.setItem('cartItems', OL);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
