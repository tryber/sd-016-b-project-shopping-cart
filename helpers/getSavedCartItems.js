const getSavedCartItems = (event) => {
  const localSave = localStorage.getItem('cartItems');
  if (!localSave) return;
  const localItems = localSave.split('%');
  const olCartItems = document.querySelector('.cart__items');

  localItems.forEach((item) => {
    const li = document.createElement('li');
    li.className = 'cart__item';
    li.innerText = item;
    li.addEventListener('click', event);
    return olCartItems.appendChild(li);
  });
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
