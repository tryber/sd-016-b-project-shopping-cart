const getSavedCartItems = () => {
  return localStorage.getItem('carItems');
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
