const saveCartItems = (parameter) => {
  if (typeof parameter === typeof '') {
    const array = [];
    array.push(parameter);
    localStorage.setItem('cartItems', JSON.stringify(array));
  } else {
    const getParent = document.querySelector('.cart__items');
    const getChildren = getParent.childNodes;
    const array2 = [];
    for (let index = 0; index < getChildren.length; index += 1) {
      array2.push(getChildren[index].innerText);
    }
    localStorage.setItem('cartItems', JSON.stringify(array2));
  }
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
