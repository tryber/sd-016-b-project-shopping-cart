const saveCartItems = (params) => {
  return localStorage.setItem('cartItems', params)
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
