const saveCartItems = (items) => {
  // chave: carItems
  console.log(items);
  localStorage.setItem('cartItems', items);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
