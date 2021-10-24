// const saveCartItems = ({ sku, name, salePrice }) => {
//   if (JSON.parse(localStorage.getItem('cartItems')) === null) {
//     const firstItemAdded = [{ sku, name, salePrice }];
//     localStorage.setItem("cartItems", JSON.stringify(firstItemAdded));
//   } else {
//     let cartItems = JSON.parse(localStorage.getItem('cartItems'));
//     cartItems.push({ sku, name, salePrice })
//     localStorage.setItem("cartItems", JSON.stringify(cartItems));
//   }
// };

const saveCartItems = (cartItems) => {
  const obj = { items: cartItems.innerHTML };
  localStorage.setItem("cartItems", JSON.stringify(obj));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
