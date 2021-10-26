const saveCartItems = (id, text) => localStorage.setItem(id, text);

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
