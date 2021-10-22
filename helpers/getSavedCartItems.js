const getSavedCartItems = () => {
  const localInfo = localStorage.getItem('cartItems');
  if (localInfo) {
    document.querySelector('.cart__items').outerHTML = localInfo;
  }
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
