const saveCartItems = (cart) => {
  // const string = ;
  localStorage.setItem('cartItems', cart.outerHTML);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
