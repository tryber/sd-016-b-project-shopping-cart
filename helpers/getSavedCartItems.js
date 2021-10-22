const createLi = (index) => {
    const li = document.createElement('li');
    li.id = localStorage.key(index);
    li.className = 'cart__item';
    li.innerText = localStorage.getItem(localStorage.key(index));
    li.addEventListener('click', function (event) { 
      localStorage.removeItem(event.target.id);
        return event.target.remove(); 
      });
    return li;
};

const getSavedCartItems = () => {
  const productCarts = document.querySelector('.cart__items');
  for (let i = 0; i < localStorage.length; i += 1) {
    productCarts.appendChild(createLi(i));
  }
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
