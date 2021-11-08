const saveCartItems = (param) => {
  if (typeof param === typeof '') {
    const arry = [];
    arry.push(param);
    localStorage.setItem('cartItems', JSON.stringify(arry));
  } else {
    const cartFather = document.querySelector('.cart__items');
    const cartChildren = cartFather.childNodes;
    const arr = [];
    for (let i = 0; i < cartChildren.length; i += 1) {
      arr.push(cartChildren[i].innerText);
    }
    localStorage.setItem('cartItems', JSON.stringify(arr));
  }
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
