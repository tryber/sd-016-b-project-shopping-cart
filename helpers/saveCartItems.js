const saveCartItems = () => {
  const cartList = document.querySelector('.cart__items');
  localStorage.setItem('cartItems', cartList.innerHTML);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
