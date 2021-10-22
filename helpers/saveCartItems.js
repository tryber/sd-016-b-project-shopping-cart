const saveCartItems = (cart) => {
  localStorage.setItem('cartItems', cart.outerHTML);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
