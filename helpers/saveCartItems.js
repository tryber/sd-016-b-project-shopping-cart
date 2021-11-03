const saveCartItems = (li) => {
  localStorage.setItem('cartItems', li);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
