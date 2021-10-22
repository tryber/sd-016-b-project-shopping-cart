const getSavedCartItems = () => {
  const items = localStorage.getItem('cartItems');
  if (!items) return;
  localStorage.removeItem('cartItems');
  return items.split(',');
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
