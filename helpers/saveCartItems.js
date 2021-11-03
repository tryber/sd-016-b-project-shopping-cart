const saveCartItems = (itemCart) => {  
  localStorage.setItem('cartItems', itemCart);
  // seu código aqui
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
