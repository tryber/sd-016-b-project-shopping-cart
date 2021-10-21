const getSavedCartItems = () => {
  const list = localStorage.getItem('shopList');
  document.querySelector('.cart__items').appendChild(list);
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
