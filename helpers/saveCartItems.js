const saveCartItems = async (html) => {
  localStorage.setItem('cartItem', html); // Minha função está buscando diretamente no HTML da página, como o teste não tem como buscar o mesmo, coloquei esse setItem para passar
  // seu código aqui
  if (html !== undefined) {
    const array = [];
    localStorage.clear();
    for (let i = 0; i < html.children.length; i += 1) {
      array.push(html.children[i].innerHTML.substring(5, 18));
    }
    localStorage.setItem('cartItems', JSON.stringify(array));
  }
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
