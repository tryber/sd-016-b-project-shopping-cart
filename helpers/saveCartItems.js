const saveCartItems = (ev) => {
  localStorage.setItem('cartItems', ev);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
