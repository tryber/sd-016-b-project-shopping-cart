const saveCartItems = (chave, param) => localStorage.setItem(chave, param);

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
