const saveCartItems = (parameter) => {
  if (Object.keys(localStorage).length === 0) {
    localStorage.setItem('cartItems', '[]');
  }
  const savingItems = JSON.parse(localStorage.getItem('cartItems'));
  savingItems.push(item.innerText);
  localStorage.cartItems = JSON.stringify(savingItems);
}

if (typeof module !== 'undefined') {
  module.exports = saveCartItems; 
}
