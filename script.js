const sectionCart = document.querySelector('.cart');
const cartList = document.querySelector('.cart__items');
const EmptyButton = document.querySelector('.empty-cart');

// ref: Author: Shishir Arora ref: https://stackoverflow.com/questions/53799108/how-to-add-a-loading-animation-while-fetch-data-from-api-vanilla-js
function appendLoading() {
  const sectionFather = document.querySelector('.container');
  const divLoading = document.createElement('div');
  divLoading.className = 'loading';
  divLoading.innerText = 'carregando...';
  sectionFather.appendChild(divLoading);
}

function removeLoading() {
  const divLoading = document.querySelector('.loading');
  divLoading.remove();
}

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

// obj: get price at each item from cart ref: https://stackoverflow.com/questions/37556240/get-everything-after-first-character
function sumPricesInCart() {
  const sumDiv = document.querySelector('.total-price');
  let sumPrices = 0;
  const cartItemList = document.getElementsByClassName('cart__item');

  // obj: problem to use HOF with HTML elements ref: https://css-tricks.com/snippets/javascript/loop-queryselectorall-matches/
  [...cartItemList].forEach((e) => {
    sumPrices += Number(e.innerHTML.split('$').pop());
  });

  sumDiv.innerHTML = sumPrices;
}

function cartItemClickListener(event) {
  event.target.remove(); // Remove item from Cart
  saveCartItems(JSON.stringify(cartList.innerHTML));
  sumPricesInCart();
}

function createCartItemElement({ id, title, price }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${id} | NAME: ${title} | PRICE: $${price}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

// Apoio Victor K. Kamigushi
function appendListCartItem(itemObject) {  
  cartList.append(createCartItemElement(itemObject)); // Create itens in cart
  saveCartItems(JSON.stringify(cartList.innerHTML)); // Save itens on Storage
  sumPricesInCart();
}

async function cartItemToBeCreated(itemID) { // fetch informations from ME and request to create itens to cart
  appendLoading(); 
  const resultPromise = await fetchItem(itemID);
  removeLoading();
  appendListCartItem(resultPromise);
}

function addCartClickListener(event) {
  const idProduct = event.target
    .parentNode
    .firstChild
    .innerText;
  cartItemToBeCreated(idProduct);
}

// Suggest  by Israel Sant'Anna: put a callback function. 
function createCustomElement(element, className, innerText, callback) {
  const e = document.createElement(element);
  
  if (callback) {
    e.addEventListener('click', callback);
  }

  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ id, title, thumbnail, price }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('span', 'item__price', `R$ ${price.toFixed(2)}`));
  section.appendChild(createCustomElement('button', 'item__add', 'Add cart', addCartClickListener));

  return section;
}

function appendSectionProductItem(productObject) { // Create items from site ML in Element .itens
  const section = document.querySelector('.items');
  section.append(createProductItemElement(productObject));
}

async function productsToBeCreated() { // fetch informations from ME and request to create itens
  appendLoading();
  const resultPromise = await fetchProducts('computador');
  removeLoading();
  resultPromise.results
    .forEach((productSummarized) => appendSectionProductItem(productSummarized));
}

function putEventOnLiWhenReload() { // reassign the event to itens in cart when the page reload
  const li = document.getElementsByClassName('cart__item');
  [...li].forEach((e) => e.addEventListener('click', cartItemClickListener));
}

function appendSumDiv() {
  const sumDiv = document.createElement('div');
  sectionCart.appendChild(sumDiv);
  sumDiv.className = 'total-price';
}

function emptyCartButton() { 
  cartList.innerHTML = '';
  sumPricesInCart();
  saveCartItems(JSON.stringify(''));
}

function renderLocalStorage() {
  const getLocalStorageItens = getSavedCartItems();
  cartList.innerHTML = JSON.parse(getLocalStorageItens);
  putEventOnLiWhenReload();
  sumPricesInCart();
}

window.onload = () => { 
  EmptyButton.addEventListener('click', emptyCartButton);
  appendSumDiv();
  renderLocalStorage();  
  productsToBeCreated();
};
