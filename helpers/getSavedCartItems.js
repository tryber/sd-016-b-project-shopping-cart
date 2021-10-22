const getSavedCartItems = () => {
  for (let index = 0; index < localStorage.length; index += 1) {
    addItemCart(localStorage.key(index));
  }
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
