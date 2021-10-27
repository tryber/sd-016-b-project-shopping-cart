const saveCartItems = async (product) => localStorage.setItem('cartItems', product);

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
