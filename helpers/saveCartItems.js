const saveCartItems = (cartItens) => {
  localStorage.setItem('cartItems', JSON.stringify(cartItens));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
