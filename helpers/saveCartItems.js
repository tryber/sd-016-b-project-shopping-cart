const saveCartItems = () => {
  // seu código aqui
  const getCartItemsContainer = document.querySelector('.cart__items');
  localStorage.setItem('cartItems', getCartItemsContainer.innerHTML);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
