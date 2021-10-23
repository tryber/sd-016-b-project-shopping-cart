const getSavedCartItems = () => {
  const saved = localStorage.getItem('cartItems').split(',');
  return saved;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
