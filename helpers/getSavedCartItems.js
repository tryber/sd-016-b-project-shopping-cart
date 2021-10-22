const getSavedCartItems = () => {
  const getCartItems = localStorage.getItem('cartItems');
  const orderList = document.querySelector('.cart__items');
  orderList.innerHTML = getCartItems;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
