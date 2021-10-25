const getSavedCartItems = async (cartItemClickListener) => {
  const cartList = document.querySelector('.cart__items');
  cartList.innerHTML = localStorage.getItem('cartItems');

  const allitens = document.querySelectorAll('.cart__item');
  allitens.forEach((acc) => acc.addEventListener('click', cartItemClickListener));
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
