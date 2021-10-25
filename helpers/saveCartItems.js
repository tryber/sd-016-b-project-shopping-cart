const saveCartItems = (listHTML) => {
  localStorage.setItem('cartItems', listHTML);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
