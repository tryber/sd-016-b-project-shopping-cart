const getSavedCartItems = (event) => {
  const localItems = localStorage.getItem('cartItems').split('%');
  if (!localItems) return;
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
