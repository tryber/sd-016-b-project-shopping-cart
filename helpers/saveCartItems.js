const saveCartItems = (element, price) => {
  localStorage.setItem('cartItems', element);
  localStorage.setItem('totalPrice', price);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
