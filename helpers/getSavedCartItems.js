
const getSavedCartItems = () => {
  const captureOl = document.querySelector('.cart__items'); // captuOL é a tag Ol onde estou refereciando 
  localStorage.getItem('cartItems');
  document.querySelectorAll('.cart__items').forEach((item) => {
    item.addEventListener('click', (event) => {
      event.target.remove();
      localStorage.setItem('cartItems', captureOl.innerHTML);
    });
  });
};

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
