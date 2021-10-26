const saveCartItems = (par) => {
  // seu código aqui
  if (!par) {
  const getCartItemsContainer = document.querySelector('.cart__items');
  localStorage.setItem('cartItems', getCartItemsContainer.innerHTML); 
} else {
  localStorage.setItem('cartItems', par);
}
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
