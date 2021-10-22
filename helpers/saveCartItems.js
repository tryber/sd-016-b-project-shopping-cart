const saveCartItems = (OlProduct) => {
  localStorage.setItem('cartItems', OlProduct);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
