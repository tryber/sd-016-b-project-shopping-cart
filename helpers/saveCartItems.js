const saveCartItems = (cart) => {
  // const string = ;
  localStorage.setItem('cartItems', cart.outerHTML);
  console.log(localStorage.getItem('cartItems'));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
