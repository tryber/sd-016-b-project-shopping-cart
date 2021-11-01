const saveCartItems = (inside) => {
  // seu código aqui
  localStorage.setItem('cartItems', inside);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
