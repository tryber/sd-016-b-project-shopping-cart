const getSavedCartItems = async (callback) => {
  const recuperar = await localStorage.getItem('cartItems');
  const listaCarrinho = document.querySelector('.cart__items');

  listaCarrinho.innerHTML = recuperar;

  callback();
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}

// async / await para passar no teste
