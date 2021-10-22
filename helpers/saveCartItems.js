const saveCartItems = () => {
  const list = document.querySelector('.cart__items');
  return localStorage.setItem('cartItems', list.innerHTML);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
