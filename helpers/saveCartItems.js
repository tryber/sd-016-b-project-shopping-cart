const saveCartItems = (product) => {
  const newList = localStorage.cartItems
    ? `${localStorage.cartItems},${product}`
    : `${product}`;
  localStorage.setItem('cartItems', newList);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
