const getSavedCartItems = () => {
  localStorage.getItem('cartItems');
  // Vi que o Danilo Couto compartilhou este código no Slack, como eu vi antes de tentar fazer meu cerebro ficou condicionado a pensar na mesma solução que ele, gastei um tempo analisando o codigo e compreendi como ele foi realizado, então optei por replicar o mesmo. 
  // const savedCart = localStorage.getItem('cartItems'); // li's
  // const cartItem = document.querySelector('.cart__items'); // ol
  // cartItem.innerHTML = savedCart; // tags coms as li's
  // document.querySelectorAll('.cart__items')
  //   .forEach((item) => item.addEventListener('click', (event) => {
  //     event.target.remove();
  //     localStorage.setItem('cartItems', cartItem.innerHTML);
  //   }));
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
