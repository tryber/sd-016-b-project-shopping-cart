function cartItemClickListener(event) {
  // coloque seu código aqui
  const listener = JSON.parse(localStorage.getItem('cartItems'));
  const listenerArr = [];
  let bool = false;
  for (let i = 0; i < listener.length; i += 1) {
    if (listener[i].includes(event.target.innerText.slice(0, 19)) && bool === false) { 
      bool = true;
    } else {
      listenerArr.push(listener[i]);
    }  
  }
  localStorage.cartItems = JSON.stringify(listenerArr);
  event.target.remove();
}

const getSavedCartItems = () => {
  // seu código aqui
  if (localStorage.length !== 0) {
    const ol = document.querySelector('.cart__items');
    const itemsSaved = JSON.parse(localStorage.cartItems);
    Object.keys(localStorage);
    for (let i = 0; i < itemsSaved.length; i += 1) {
      const li = document.createElement('li');
      li.className = 'cart__item';
      li.innerText = itemsSaved[i];
      li.addEventListener('click', cartItemClickListener);
      ol.appendChild(li);
    }
  }
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
