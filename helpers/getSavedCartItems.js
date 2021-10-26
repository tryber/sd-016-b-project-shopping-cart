const getSavedCartItems = () => {
  if (localStorage.cartItems !== undefined) {
    const cartItemsClass = document.querySelector('.cart__items');
    const recoverCartItems = JSON.parse(localStorage.getItem('cartItems'));
    
    for (let index = 0; index < recoverCartItems.length; index += 1) {
      const li = document.createElement('li');
      li.innerText = recoverCartItems[index];
      cartItemsClass.appendChild(li);
    }
  } else {
    return localStorage.getItem('cartItems');
  }
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
