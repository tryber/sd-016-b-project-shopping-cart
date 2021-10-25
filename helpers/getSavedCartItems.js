const getSavedCartItems = async () => {
  return await localStorage.getItem('cartItems')
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
