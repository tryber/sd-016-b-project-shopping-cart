const saveCartItems = () => {
  const $data = document.querySelector('.cart__items');
  localStorage.setItem('cartItems', $data.innerHTML);
};

if (typeof module !== 'undefined') module.exports = saveCartItems;