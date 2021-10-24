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
async function getSavedCartItems() {
  const recoveredCartItems = await JSON.parse(localStorage.getItem("cartItems"));
  const cartItems = document.querySelector('.cart__items')
  cartItems.innerHTML = Object.values(recoveredCartItems);

  cartItems.addEventListener('click', (event) => {
    event.target.remove();
    saveCartItems(cartItems)
  });
};


if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
