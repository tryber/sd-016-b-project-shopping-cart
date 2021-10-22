// global variables
const catchCart = document.querySelector('.cart__items');
const catchItens = document.querySelector('.items');
const catchCartButton = document.querySelector('.empty-cart');
const creatElement = document.createElement('p');
const catchCartSection = document.querySelector('.cart');
creatElement.classList.add('total-price');
catchCartSection.appendChild(creatElement);

// functions project
function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  const catchCartItem = event.target;
  catchCartItem.remove();
  saveCartItems(catchCart.innerHTML);
}
const counter = (test) => {
  creatElement.innerText = parseFloat(Number(creatElement.innerText) + Number(test));

  /* codigo original porem nao é viavel.Ao remover o item do carinho, esse valor nao é removido do array
   prices.push(test);
  const totalPrice = prices.reduce((acc, price) => {
    const total = acc + price;
    return total; 
  });
  creatElement.innerHTML = totalPrice; */
};
function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  counter(salePrice);

  return li;
}
// my functions
// cria e remove loading
const creatLoadingFeat = async () => {
  const span = document.createElement('span');
  span.classList.add('loading');
  span.innerHTML = 'loading...';
  catchCart.appendChild(span);
};
const removeLoadingFeat = async () => {
  const catchLoading = document.querySelector('.loading');
  return catchLoading.remove();
};
// cria itens na pagina
const creatWithArrayItens = async () => {
  creatLoadingFeat();
  const itensList = await fetchProducts('computador');
  removeLoadingFeat();
  const itensListFiltred = itensList.results.map(({ id, title, thumbnail }) =>
    ({ sku: id, name: title, image: thumbnail }));
  itensListFiltred.forEach((element) =>
    catchItens.appendChild(createProductItemElement(element)));
};
// cria os itens no carrinho
const creatItensOnShoppingCart = async (id) => {
  creatLoadingFeat();
  const item = await fetchItem(id);
  removeLoadingFeat();
  catchCart.appendChild(createCartItemElement(item));
  saveCartItems(catchCart.innerHTML);
};
// codigo para escrever o nome dos itens no carrinho
const getIdItem = (item) => item.target.parentNode.firstChild.innerHTML;
const addItemOnShopCart = () =>
  /* usei o codigo a baixo do para fazer dinamicamente a inclusão de itens https://stackoverflow.com/questions/34896106/attach-event-to-dynamic-elements-in-javascript 
  e tive a ajuda na mentoria */
  document.addEventListener('click', (item) => {
    if (item.target && item.target.classList.contains('item__add')) {
      creatItensOnShoppingCart(getIdItem(item));
    }
    // esse codigo é para poder excluir os itens depois q a pagina recarregou
    if (item.target && item.target.classList.contains('cart__item')) {
      cartItemClickListener(item);
    }
  });
const removeAllItens = () => catchCartButton.addEventListener('click', () => {
  catchCart.innerHTML = '';
  creatElement.innerHTML = '';
  prices = [];
});
function loadItemsInCart() {
  const iHTMLcartI = getSavedCartItems();
  catchCart.innerHTML = iHTMLcartI;
}

window.onload = () => {
  loadItemsInCart();
  creatWithArrayItens();
  addItemOnShopCart();
  removeAllItens();
};