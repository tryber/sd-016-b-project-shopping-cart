const getSavedCartItems = () => {
  const itemsSaved = localStorage.getItem('cartItems');
  document.querySelector('.cart__items').innerHTML = itemsSaved;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
