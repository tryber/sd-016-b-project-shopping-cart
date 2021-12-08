const saveCartItems = (item) => {
  localStorage.setItem('cartItems', item);
  // Adiciona o elemento HTML ao Local Storage com a chave 'cartItems'.
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
