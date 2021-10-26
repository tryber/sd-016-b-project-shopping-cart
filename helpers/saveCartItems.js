const saveCartItems = (arr) => localStorage.setItem('cartItem', arr);  

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
