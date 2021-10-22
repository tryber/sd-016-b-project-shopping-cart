const getSavedCartItems = () => {
  const list = document.querySelector('.cart__items');
  const localstorageData = localStorage.getItem('cartItems');
  if (localStorage.length !== 0 && list !== null) {
    list.outerHTML = localstorageData;
  }
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
