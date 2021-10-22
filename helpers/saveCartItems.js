const saveCartItems = (element) => {
  localStorage.setItem('cartItems', JSON.stringify(element));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
