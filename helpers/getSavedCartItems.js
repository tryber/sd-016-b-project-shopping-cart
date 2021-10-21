const getSavedCartItems = (param) => {
  if (param === 'carrinho') return localStorage.getItem('carItems');
  if (param === 'valor') return localStorage.getItem('valor');
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
