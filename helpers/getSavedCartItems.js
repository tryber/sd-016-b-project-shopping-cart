const getSavedCartItems = () => {
  const saved = localStorage.getItem('cartItems');
  return saved;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
