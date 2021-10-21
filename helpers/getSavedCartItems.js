const getSavedCartItems = () => {
  const oldList = localStorage.getItem('cartItems') || undefined;
  return oldList;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
