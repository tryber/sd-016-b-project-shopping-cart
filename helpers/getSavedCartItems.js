const getSavedCartItems = () => {
  const storage = localStorage.getItem('cartItems');
  return storage;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
