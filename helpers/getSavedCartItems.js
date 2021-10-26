const getSavedCartItems = () => {
  // seu código aqui
  const getCartitems = document.querySelector('.cart__items');
  const cartStorage = localStorage.getItem('cartItems');
  getCartitems.innerHTML = cartStorage;
};

// fonte: https://gomakethings.com/saving-html-to-localstorage-with-vanilla-js/

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
