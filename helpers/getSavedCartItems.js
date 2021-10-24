// const getSavedCartItems = () => {
//   const cartItems = JSON.parse(localStorage.getItem("cartItems"));
//   localStorage.removeItem("cartItems");

//   if (cartItems !== null) {
//     cartItems.forEach(cartItem => {
//       InsertInCart(cartItem.sku)
//     });
//   }
// };

// const getSavedCartItems = () => {
function getSavedCartItems() {
  const recoveredCartItems = localStorage.getItem("cartItems");
  const cartItems = document.querySelector('.cart__items');

  if (cartItems !== null) {
    cartItems.innerHTML = recoveredCartItems;
  
    cartItems.addEventListener('click', (event) => {
      event.target.remove();
      saveCartItems(cartItems.innerHTML);
    });
  }
};


if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
