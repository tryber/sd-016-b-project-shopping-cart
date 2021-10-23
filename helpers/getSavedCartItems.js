const getSavedCartItems = () => {
  const captureOl = document.querySelector('.cart__items'); // captuOL é a tag Ol onde estou refereciando 
  localStorage.getItem('cartItems');
  document.querySelectorAll('.cart__items').forEach((item) => {
    item.addEventListener('click', (event) => {
      event.target.remove();
      localStorage.setItem('cartItems', captureOl.innerHTML);
    });
  });
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
