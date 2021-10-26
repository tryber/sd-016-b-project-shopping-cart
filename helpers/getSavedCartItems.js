const getSavedCartItems = () => {
const getItems = localStorage.getItem('cartItems');
return getItems;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
