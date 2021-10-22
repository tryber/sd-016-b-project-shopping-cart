const saveCartItems = (id, product) => {
  localStorage.setItem(id, product);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
