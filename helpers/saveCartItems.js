const saveCartItems = () => {
  // seu código aqui
  const cartItems = document.querySelector('.cart__items');
  console.log(cartItems);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
