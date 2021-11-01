const saveCartItems = ($data) => localStorage.setItem('cartItems', $data);
if (typeof module !== 'undefined') module.exports = saveCartItems;