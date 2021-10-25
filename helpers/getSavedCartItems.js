// ******************************************************
// Funcionalidade: De acordo com o requesito essa função 
// deve ter uma única funcionalidade, que é recuperar itens
// do carrinho de compras (localStorage) quando carregamos 
// a página.

const getSavedCartItems = () => localStorage.getItem('cartItems');

// ********************
// COMENTANDO FUNÇÃO: 
// ********************
// Aqui foi utilizado uma estrutura condicional simples onde foi utilizado o método 
// typeof para verificar se o módule de exportação está diferente de undefine (vazio)
// se tiver algo será uma função ou funções que estarão compondo seu corpo(estrutura)
// neste caso deve ser todas exportadas para o arquivo que fizer seu required;  
if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}