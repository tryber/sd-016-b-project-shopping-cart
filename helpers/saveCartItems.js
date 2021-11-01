const saveCartItems = (el) => {
    localStorage.setItem('cartItems', el);
  };
  
  if (typeof module !== 'undefined') {
    module.exports = saveCartItems;
  }