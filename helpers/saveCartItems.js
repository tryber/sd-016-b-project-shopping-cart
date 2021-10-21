const saveCartItems = () => {
  const products = document.querySelectorAll('.cart__items');
  products.forEach((product) => localStorage
    .setItem('shopping Cart', JSON.stringify(product.innerText)));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
