const getSavedCartItems = () => {
    if (localStorage.cartItems !== undefined) {
    const cartItem = document.querySelector('.cart__items');
    const cartLocal = JSON.parse(localStorage.getItem('cartItems'));
      for (let i = 0; i < cartLocal.length; i += 1) {
        const creatLi = document.createElement('li');
        creatLi.innerText = cartLocal[i];
        cartItem.appendChild(creatLi);
      }
    } else {
      return localStorage.getItem('cartItems');
    }
  };

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
