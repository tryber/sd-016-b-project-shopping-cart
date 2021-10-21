const saveCartItems = () => {
  const products = document.querySelectorAll('.cart__items');
  products.forEach((product) => localStorage
    .setItem('shopping Cart', JSON.stringify(product.innerHTML)));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
