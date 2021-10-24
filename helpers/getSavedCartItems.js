const getSavedCartItems = () => {
  const cartItems = JSON.parse(localStorage.getItem("cartItems"));
  localStorage.removeItem("cartItems");

  if (cartItems !== null) {
    cartItems.forEach(cartItem => {
      InsertInCart(cartItem.sku)
    });
  }
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
