const saveCartItems = (computersToBuy) => {
  localStorage.setItem('cartItems', computersToBuy);
};
// para salvar com localStorage
if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
