const saveCartItems = (param) => localStorage.setItem('carItems', param);

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
