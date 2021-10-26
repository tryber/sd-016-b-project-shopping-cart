const saveCartItems = (key = 'cartItems', itemsList) => {
  localStorage.setItem(key, itemsList);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
