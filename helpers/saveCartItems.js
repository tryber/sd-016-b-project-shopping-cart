const saveCartItems = () => {
  // seu código aqui
  const arr = [];
  const teste = document.querySelectorAll('.cart__item');
  teste.forEach((currV, index) => arr.push(teste[index].innerText));
  localStorage.setItem('carrinho', arr);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
