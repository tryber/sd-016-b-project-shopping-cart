const saveCartItems = (item) => {
  // seu código aqui
  console.log(item);
  if (Object.keys(localStorage).length === 0) {
    localStorage.setItem('cartItems', '[]');
  }
  const lala = JSON.parse(localStorage.getItem('cartItems'));
  lala.push(item.innerText);
  localStorage.cartItems = JSON.stringify(lala);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems; 
}
