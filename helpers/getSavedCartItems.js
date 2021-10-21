const getSavedCartItems = () => {
//   // seu código aqui
  if (localStorage.cartItems !== undefined) {
  const getFather = document.querySelector('.cart__items');
  const getLocal = JSON.parse(localStorage.getItem('cartItems'));
    for (let i = 0; i < getLocal.length; i += 1) {
      const createLi = document.createElement('li');
      createLi.innerText = getLocal[i];
      getFather.appendChild(createLi);
    }
  } else {
    return localStorage.getItem('cartItems');
  }
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
