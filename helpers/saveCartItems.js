const saveCartItems = (parameter) => {
  const newList = localStorage.cartItems ? `${localStorage.cartItems}, ${parameter}`
  : `${parameter}`;
  localStorage.setItem('cartItems', newList);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
