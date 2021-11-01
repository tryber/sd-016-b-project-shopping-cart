const getSavedCartItems = () => {
  // seu código aqui
  localStorage.getItem('cartProducts');
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
