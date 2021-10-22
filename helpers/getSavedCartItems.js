const getSavedCartItems = () => {
  const localInfo = localStorage.getItem('cartItems');
  if (!localInfo) {
    localStorage.setItem('cartItems', '');
  } else {
    document.querySelector('.cart__items').outerHTML = localInfo;
  }
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
