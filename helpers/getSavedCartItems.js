const getSavedCartItems = () => {
  if (localStorage.cartItems !== undefined) {
    const cartItemsClass = document.querySelector('.cart__items');
    const getCartItems = localStorage.getItem('cartItems').split(',');

    getCartItems.forEach((item) => {
      const li = document.createElement('li');
      li.innerText = item;
      cartItemsClass.appendChild(li);
    });
  }
  return localStorage.getItem('cartItems');
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
