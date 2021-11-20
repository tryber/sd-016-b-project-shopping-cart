const getSavedCartItems = () => localStorage.getItem('cartItems');

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}

// Requisito 4 : Utilizei esse artigo (https://tableless.com.br/guia-f%C3%A1cil-sobre-usar-localstorage-com-javascript/) para relemebrar o uso do LocalStorage para a construção da lógica desse requisito.
