const getSavedCartItems = () => {
  // seu código aqui
  const savedItems = localStorage.getItem('cartItems');
  const cartItem = document.querySelector('.cart__items');
  console.log(cartItem);
  console.log(savedItems);
  cartItem.innerHTML = savedItems;
  // console.log(typeof (savedItems));
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}

// Informações utilizadas para o exercício de localStorage em https://blog.logrocket.com/localstorage-javascript-complete-guide/