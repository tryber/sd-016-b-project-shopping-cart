/*
- Recuperar os dados que estão gravados na saveCartItens
*/
const getSavedCartItems = () => localStorage.getItem('cartItens');

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
