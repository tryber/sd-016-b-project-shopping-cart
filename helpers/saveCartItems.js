const saveCartItems = (param) => {
  // seu código aqui
  if (typeof param === typeof '') {
    const array = [];
    array.push(param);
    localStorage.setItem('cartItems', JSON.stringify(array));
  } else {
    const getFather = document.querySelector('.cart__items');
    const getChildren = getFather.childNodes;
    const arr = [];
    for (let i = 0; i < getChildren.length; i += 1) {
      arr.push(getChildren[i].innerText);
    }
    localStorage.setItem('cartItems', JSON.stringify(arr));
  }
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
