const cartOl = document.querySelector('.cart__items');
const totalPrice = document.querySelector('.total-price');

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

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
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

function showLoadingScreen() {
  const loadingP = document.createElement('p');
  loadingP.className = 'loading';
  loadingP.innerText = 'carregando...';
  const sectionItems = document.querySelector('.items');
  sectionItems.appendChild(loadingP);
}

function removeLoadingScreen() {
  const sectionItems = document.querySelector('.items');
  const loadingP = document.querySelector('.loading');
  sectionItems.removeChild(loadingP);
}

async function takeProductsAndShowThem() {
  showLoadingScreen();
  const computers = await fetchProducts('computador');
  removeLoadingScreen();
  const section = document.querySelector('.items');
  computers.forEach((computer) => {
    section.appendChild(createProductItemElement(computer));
  });
}

async function sumCartItems() {
  await takeProductsAndShowThem();
  const arrCartItems = cartOl.childNodes;
  totalPrice.innerHTML = '';
  arrCartItems.forEach((item) => {
    const itemPrice = Number(item.innerHTML.split('$')[1]);
    totalPrice.innerHTML = Number(totalPrice.innerHTML) + itemPrice;
  });
  saveCartItems(cartOl.innerHTML, totalPrice.innerHTML);
}

function cartItemClickListener(event) {
  // coloque seu código aqui
  const ol = event.target.parentElement;
  ol.removeChild(event.target);
  saveCartItems(cartOl.innerHTML);
  sumCartItems();
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function addToCart(computer) {
  cartOl.appendChild(createCartItemElement(computer));
  saveCartItems(cartOl.innerHTML);
  sumCartItems();
}

async function addToCartClickListener(event) {
  const product = event.target.parentElement;
  const id = getSkuFromProductItem(product);
  const computer = await fetchItem(id);
  addToCart(computer);
}

async function getButtons() {
  await takeProductsAndShowThem();
  const buttons = document.querySelectorAll('.item__add');
  buttons.forEach((button) => {
    button.addEventListener('click', addToCartClickListener);
  });
}

function emptyCart() {
  const emptyButton = document.querySelector('.empty-cart');
  emptyButton.addEventListener('click', () => {
    // Solução retirada de: https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
    // Enquanto e minha ol ter um primeiro elemento filho, eu removo o ultimo.
    while (cartOl.firstChild) {
      cartOl.removeChild(cartOl.lastChild);
    }
    saveCartItems(cartOl.innerHTML);
  });
}

function eraseStorageCartItem() {
  const cartLi = document.querySelectorAll('.cart__item');
  cartLi.forEach((item) => item.addEventListener('click', (event) => {
    event.target.remove();
    saveCartItems(cartOl.innerHTML);
    sumCartItems();
  }));
}

window.onload = () => {
  getButtons();
  emptyCart();
  getSavedCartItems();
  eraseStorageCartItem();
};
