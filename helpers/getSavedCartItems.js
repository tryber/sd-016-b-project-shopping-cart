const getSavedCartItems = () => {
  localStorage.getItem('carrinho');
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
