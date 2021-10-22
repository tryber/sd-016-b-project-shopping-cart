const saveCartItems = (cartItems) => {
  localStorage.setItem('myCart', JSON.stringify(cartItems));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
