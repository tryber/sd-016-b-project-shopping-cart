const saveCartItems = () => {
    const cartItems = document.querySelector('.cart__items');
    const valueItemns = document.querySelector('.cart__item');
    localStorage.setItem(cartItems, JSON.stringify(valueItemns));
};
document.onchange = saveCartItems;
saveCartItems();

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
