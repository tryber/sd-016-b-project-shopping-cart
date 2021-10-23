const saveCartItems = (salvo) => {
  localStorage.setItem('cartItems', salvo);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
