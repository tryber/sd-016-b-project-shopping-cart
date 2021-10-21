const saveCartItems = (innerHTML) => {
  return localStorage.setItem('cartItems', innerHTML);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
