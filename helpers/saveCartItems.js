const saveCartItems = (cart) => localStorage.setItem('cartItems', cart);

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}

// Requisito 4 : Utilizei esse artigo (https://tableless.com.br/guia-f%C3%A1cil-sobre-usar-localstorage-com-javascript/) para relemebrar o uso do LocalStorage para a construção da lógica desse requisito.
