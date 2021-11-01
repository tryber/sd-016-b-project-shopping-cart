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

function getCartList() {
  return document.querySelector('.cart__items');
}

function addCartSubtotal(cartSubtotal) {
  const spanSubtotal = document.querySelector('.total-price');
  spanSubtotal.innerText = cartSubtotal;
}

function calculateCartSubtotal() {
  const cartItems = document.querySelectorAll('.cart__item');
  const subtotal = [...cartItems].reduce((acc, item) => {
    const itemPrice = item.innerText.split('$')[1];
    /*
    Consultei o site abaixo para checar sintaxe do parseFloat.
    ref: https://www.w3schools.com/Jsref/jsref_parsefloat.asp
    */
    const parsedItemPrice = parseFloat(itemPrice, 10);
    return acc + parsedItemPrice;
  }, 0);
  addCartSubtotal(subtotal);
}

function cartItemClickListener(event) {
  const cartList = getCartList();
  cartList.removeChild(event.target);
  calculateCartSubtotal();
  /*
  Consultei o link abaixo para entender como salvar um elemento HTML no localStorage.
  ref: https://gomakethings.com/saving-html-to-localstorage-with-vanilla-js/
  */
  saveCartItems(getCartList().innerHTML);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function clearCart() {
  const cartList = getCartList();
  cartList.innerHTML = '';
  localStorage.clear();
  calculateCartSubtotal();
}

function enableClearCartButton() {
  const clearCartButton = document.querySelector('.empty-cart');
  clearCartButton.addEventListener('click', clearCart);
}

async function appendItemToCart(event) {
  const itemId = event.target.parentElement.firstChild.innerText;
  const item = await fetchItem(itemId);
  const cartList = getCartList();
  const itemObject = {
    sku: item.id,
    name: item.title,
    salePrice: item.price,
  };
  cartList.appendChild(createCartItemElement(itemObject));
  calculateCartSubtotal();
  saveCartItems(getCartList().innerHTML);
}

function enableProductsButtonsClickEvent() {
  const buttons = document.querySelectorAll('.item__add');
  buttons.forEach((button) => {
    button.addEventListener('click', appendItemToCart);
  });
}

function appendLoadingMessage() {
  const sectionItems = document.querySelector('.items');
  const sectionItemsParent = sectionItems.parentElement;
  const section = document.createElement('section');
  section.className = 'loading';
  section.innerText = 'carregando...';
  /*
  Consultei o link abaixo para relembrar a sintaxe do método insertBefore.
  ref: https://developer.mozilla.org/pt-BR/docs/Web/API/Node/insertBefore
  */
  sectionItemsParent.insertBefore(section, sectionItems);
}

function removeLoadingMessage() {
  const sectionLoading = document.querySelector('.loading');
  const sectionLoadingParent = sectionLoading.parentElement;
  sectionLoadingParent.removeChild(sectionLoading);
}

/*
Consultei o vídeo do Bernardo Salgueiro, disponibilizado no canal da Turma B, para desenvolver parte da função getProducts.
ref: https://files.slack.com/files-tmb/TMDDFEPFU-F02KATKTLBS-a04e16cc19/primeiro_requisito_-_shopping_cart.mp4
*/

async function getProducts(productName) {
  const products = await fetchProducts(productName);
  removeLoadingMessage();
  const sectionItems = document.querySelector('.items');

  products.results.forEach((product) => {
    const productObject = {
      sku: product.id,
      name: product.title,
      image: product.thumbnail,
    };

    sectionItems.appendChild(createProductItemElement(productObject));
  });

  enableProductsButtonsClickEvent();
}

async function recoverSavedCartItems() {
  const storageItems = getSavedCartItems();
  const cartList = getCartList();
  /*
  Consultei o link abaixo para entender como atribuir o elemento HTML salvo no localStorage a um elemento do DOM.
  ref: https://gomakethings.com/saving-html-to-localstorage-with-vanilla-js/
  */
  cartList.innerHTML = storageItems;
  calculateCartSubtotal();
  /*
  Consultei o link abaixo para entender como usar HOFs em Node List e HTML Collection.
  ref: https://css-tricks.com/snippets/javascript/loop-queryselectorall-matches/
  */
  [...cartList.children].forEach((child) => {
    child.addEventListener('click', cartItemClickListener);
  });
}

async function checkLocalStorage() {
  if (localStorage.length !== 0) await recoverSavedCartItems();
}

window.onload = () => {
  appendLoadingMessage();
  getProducts('computador');
  checkLocalStorage();
  enableClearCartButton();
};
