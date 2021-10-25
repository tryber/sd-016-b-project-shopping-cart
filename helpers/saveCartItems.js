const saveCartItems = (saveCartList) => {
  // seu código aqui
  localStorage.clear();
  localStorage.setItem('cartItems', saveCartList);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
