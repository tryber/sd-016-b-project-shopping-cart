const getSavedCartItems = () => {
  const ol = document.querySelector('.cart__items');
  const totalPrice = document.querySelector('.total-price');
  ol.innerHTML = localStorage.getItem('cartItems');
  if (!localStorage.getItem('totalPrice')) {
    totalPrice.innerHTML = 0;
  } else {
    totalPrice.innerHTML = localStorage.getItem('totalPrice');
  }
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
