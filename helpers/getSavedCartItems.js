const getSavedCartItems = (event) => {
  const localItems = Object.keys(localStorage).filter((item) => item.includes('MLB'));
  const olCartItems = document.querySelector('.cart__items');

  localItems.forEach((item) => {
    const li = document.createElement('li');
    li.className = 'cart__item';
    li.innerText = localStorage.getItem(item);
    li.addEventListener('click', event);
    return olCartItems.appendChild(li);
  });
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
