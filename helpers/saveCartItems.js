const saveCartItems = () => {
  const cart = document.querySelector('.cart__items').innerHTML;
  localStorage.setItem('shoppingCart', cart);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
