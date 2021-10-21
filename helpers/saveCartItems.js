const saveCartItems = (el) => {
  localStorage.setItem('cartItems', el);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}

// const olCartItens = document.querySelector('.cart__items').innerHTML;
//
// const objetoWithItems = {};
// olCartItens.forEach((element, index) => {
//   objetoWithItems[index] = element;
// });
// console.log(el);
