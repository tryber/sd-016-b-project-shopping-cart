/*
- Salvar os itens do carrinho no localStorage
- em uma chave:(cartItens)
- Fazer a lista está sempre att(com adiões e remoções)
*/
const saveCartItems = (item) => {
  localStorage.setItem('cartItens', item);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
