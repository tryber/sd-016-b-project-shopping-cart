const getSavedCartItems = () => {
  // seu código aqui
  const storageArray = localStorage.getItem('cartItems');
  return storageArray;
};

getSavedCartItems();

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
