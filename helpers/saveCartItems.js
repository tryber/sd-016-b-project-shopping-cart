const saveCartItems = () => {
  const products = document.querySelectorAll('.cart__items');
  products.forEach((product) => localStorage
  .setItem('cartItems', JSON.stringify(product.innerHTML)));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
