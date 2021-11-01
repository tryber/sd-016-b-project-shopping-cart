const getSavedCartItems = () => {
  // seu código aqui
  if (localStorage.cartItems !== undefined) {
    const cartItemsClass = document.querySelector('.cart__items');
    const getCartItems = JSON.parse(localStorage.getItem('cartItems'));

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
