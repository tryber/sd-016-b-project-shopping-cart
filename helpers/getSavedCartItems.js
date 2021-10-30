const getSavedCartItems = () => {
  if (localStorage.cartItems !== undefined) {
    const getParent = document.querySelector('.cart__items');
    const getLocal = JSON.parse(localStorage.getItem('cartItems'));
    for (let index = 0; index < getLocal.length; index += 1) {
      const createLi = document.createElement('li');
      createLi.innerText = getLocal[index];
      getParent.appendChild(createLi);
    }
  } else {
    return localStorage.getItem('cartItems');
  }
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
