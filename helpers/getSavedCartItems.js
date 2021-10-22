const getSavedCartItems = () => localStorage.getItem('cartItems');
getSavedCartItems();
if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
