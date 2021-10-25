const saveCartItems = (val) => {
  if (typeof val !== 'object') {
    localStorage.setItem('cartItems', val);
  } else {
    const { sku, name, salePrice } = val;
  let arr = [{ sku, name, salePrice }];
  if (localStorage.length) {
    arr = JSON.parse(localStorage.getItem('cartItems'));
    arr.push({ sku, name, salePrice });
    localStorage.clear();
    localStorage.setItem('cartItems', JSON.stringify(arr));
  }
  localStorage.setItem('cartItems', JSON.stringify(arr));
}
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}