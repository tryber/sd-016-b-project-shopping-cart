const getSavedCartItems = () => {
  const items = localStorage.getItem('myCart');
  return items;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
