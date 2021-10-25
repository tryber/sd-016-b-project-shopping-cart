const saveCartItems = (element) => {
  localStorage.setItem('cartItems', element.innerHTML)
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
