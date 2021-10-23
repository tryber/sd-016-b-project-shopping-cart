const saveCartItems = (item) => {
  localStorage.clear();
  localStorage.setItem('cartItems', JSON.stringify(item));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
