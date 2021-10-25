const removeCartItems = (product) => {
  const newList = localStorage
    .cartItems
    .split(',')
    .filter((item) => item !== product)
    .join(',');
  if (!newList) return localStorage.removeItem('cartItems');
  localStorage.setItem('cartItems', newList);
};

if (typeof module !== 'undefined') {
  module.exports = removeCartItems;
}
