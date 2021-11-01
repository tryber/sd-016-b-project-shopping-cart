const saveCartItems = (item) => {
  const newItem = localStorage.cartItems
  ? `${localStorage.cartItems}%${item}`
  : `${item}`;
  
  localStorage.setItem('cartItems', newItem);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
