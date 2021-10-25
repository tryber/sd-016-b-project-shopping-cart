const saveCartItems = () => {
  const items = document.querySelector('.cart__items').innerHTML;
  localStorage.setItem('cartItems', `${items}`);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
