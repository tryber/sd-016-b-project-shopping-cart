const saveCartItems = (cartItemsWrapper) => {  
  localStorage.setItem('cartItems', cartItemsWrapper.innerHTML)
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
