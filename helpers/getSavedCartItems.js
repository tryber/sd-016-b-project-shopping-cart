const getSavedCartItems = () => localStorage.getItem('carItems');

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
