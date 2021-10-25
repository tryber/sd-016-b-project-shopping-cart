const saveCartItems = (array) => {
  // const newList = localStorage.cartItems ? `${localStorage.cartItems}, ${parameter}`
  // : `${parameter}`;
  // localStorage.setItem('cartItems', newList);
  if (typeof array === 'string') {
    const newArray = [];
    newArray.push(array);

    localStorage.setItem('cartItems',JSON.stringify(array));
  } else {
    const cartItemsClass = document.querySelector('.cart__items');
    const carItemsSons = cartItemsClass.childNodes;
    const newArray = [];
    // carItemsSons.forEach((item) => newArray.push(item.innerText));
    for (let index = 0; index < carItemsSons.length; index += 1) {
      newArray.push(carItemsSons[index].innerText);
    }
    localStorage.setItem('cartItems', JSON.stringify(newArray));
  }
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
