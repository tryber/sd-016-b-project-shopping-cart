const allIds = [];
const saveCartItems = (param) => {
  if (param !== undefined) {
    allIds.push(param);
    localStorage.setItem('cartItems', allIds);
  }
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
