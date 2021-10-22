const saveCartItems = (saveList) => {
    localStorage.setItem('cartItems', saveList);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
