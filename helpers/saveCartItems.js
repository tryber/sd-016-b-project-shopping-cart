const saveCartItems = (saveList) => {
  document.querySelector('.container').addEventListener('click', () => {
    localStorage.setItem('shopList', saveList);
  });
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
