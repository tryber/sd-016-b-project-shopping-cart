const getSavedCartItems = (key) => {
  // seu código aqui
  localStorage.getItem(key);
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
