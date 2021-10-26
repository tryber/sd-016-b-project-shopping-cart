const getSavedCartItems = () => {
  // seu código aqui
  localStorage.getItem('cartItems');
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}

// Informações utilizadas para o exercício de localStorage em https://blog.logrocket.com/localstorage-javascript-complete-guide/