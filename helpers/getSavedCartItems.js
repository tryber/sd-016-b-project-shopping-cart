const getSavedCartItems = () => localStorage.getItem('cartItems');
    // document.querySelector('ol.cart__items').innerHTML = $data;

if (typeof module !== 'undefined') module.exports = getSavedCartItems;
