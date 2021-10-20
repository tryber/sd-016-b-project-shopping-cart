const saveCartItems = (olSaved) => {
  localStorage.setItem('cartItems', olSaved);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
