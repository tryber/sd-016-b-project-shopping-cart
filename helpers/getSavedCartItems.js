const getSavedCartItems = () => localStorage.getItem('cartItems');

// seleciona os dados que serão salvos.

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
