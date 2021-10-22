const cartItem = [];
const saveCartItems = () => {
  const cartItems = document.querySelectorAll('.cart__item');
  cartItems.forEach((item) => {
    cartItem.push(item.innerText);
    localStorage.setItem('MyCart', cartItem);
  });
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
