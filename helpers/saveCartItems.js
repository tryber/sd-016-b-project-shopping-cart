const saveCartItems = async (html) => {
  // seu código aqui
  if (html !== undefined) {
    localStorage.setItem('cartItems', html);
  }
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
