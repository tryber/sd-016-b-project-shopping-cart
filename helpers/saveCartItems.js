const saveCartItems = () => {
  // seu código aqui
  const arr = [];
  const items = document.querySelectorAll('.cart__item');
  items.forEach((currV, index) => arr.push(items[index].innerText));
  localStorage.setItem('cartItem', arr);  
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
