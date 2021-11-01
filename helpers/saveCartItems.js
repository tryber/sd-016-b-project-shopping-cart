const saveCartItems = () => {
  // seu código aqui
  const cartItems = document.querySelector('.cart__items');
  console.log(cartItems);
  const savedItems = cartItems.innerHTML;
  localStorage.setItem('cartItems', savedItems);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
