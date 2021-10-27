const saveCartItems = () => {
  // seu código aqui
  const cartItems = document.querySelector('.cart__items');
  console.log(cartItems);
  localStorage.setItem('cartItems', cartItems.innerHTML);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
