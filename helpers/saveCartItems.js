const saveCartItems = (array) => {
  if (typeof array === 'string') {
    const newArray = [];
    newArray.push(array);

    localStorage.setItem('cartItems', JSON.stringify(newArray));
  } else {
    const cartItemsClass = document.querySelector('.cart__items');
    const carItemsSons = cartItemsClass.childNodes;
    const newArray = [];
    for (let index = 0; index < carItemsSons.length; index += 1) {
      newArray.push(carItemsSons[index].innerText);
    }

    localStorage.setItem('cartItems', JSON.stringify(newArray));
  }
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
