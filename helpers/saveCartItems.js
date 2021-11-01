const saveCartItems = (product) => {
  // seu código aqui
  localStorage.setItem('cartItems', product.innerHTML);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
