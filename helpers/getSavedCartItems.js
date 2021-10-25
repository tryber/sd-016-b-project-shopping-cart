const getSavedCartItems = () => localStorage.getItem('cartItems');
// console.log(getSavedCartItems);

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
