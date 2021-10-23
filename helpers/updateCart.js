function updateCart() {
  const base = getSavedCartItems();
  const newBase = base.split(',');
  const cart = document.querySelector('.cart__items');
  cart.innerHTML = '';
  newBase.forEach(async (cartIten) => { 
    const newItem = await fetchItem(cartIten);
    cart.appendChild(createCartItemElement(newItem));
  });
}

if (typeof module !== 'undefined') {
  module.exports = updateCart;
}