const getSavedCartItems = () => {
  const cart = document.querySelector('.cart__items');
  cart.innerHTML = localStorage.getItem('shoppingCart');
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
