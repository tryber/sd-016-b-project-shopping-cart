// A função saveCartItems deve salvar os itens do carrinho de compras no localStorage, em uma chave denominada cartItems. Todas as adições e remoções devem ser abordadas para que a lista esteja sempre atualizada.

// item da lista possui classe 'cart__item'
// chamar a ol (lista)

const saveCartItems = (productAddToCart) => {
  localStorage.setItem('cartItems', productAddToCart);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
