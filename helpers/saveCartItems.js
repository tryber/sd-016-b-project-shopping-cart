const saveCartItems = ({ sku, name, salePrice }) => {
  if (JSON.parse(localStorage.getItem('cartItems')) !== null) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems'));
    cartItems.push({ sku, name, salePrice })
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  } else {
    const firstItemAdded = [{ sku, name, salePrice }];
    localStorage.setItem("cartItems", JSON.stringify(firstItemAdded));
  }
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
