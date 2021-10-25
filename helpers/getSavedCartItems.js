const getSavedCartItems = (cartItemClickListener) => {
  const cartList = document.querySelector('.cart__items');
  cartList.innerHTML = localStorage.getItem('cartItems');
  const allitens = document.querySelectorAll('.cart__item');
  console.log(allitens);
  for (let index = 0; index < allitens.length; index += 1) {
    allitens[index].addEventListener('click', cartItemClickListener);
  }
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
