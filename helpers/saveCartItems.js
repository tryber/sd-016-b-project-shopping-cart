const saveCartItems = (item) => {
  // seu código aqui
  localStorage.setItem('cartProducts', item);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
