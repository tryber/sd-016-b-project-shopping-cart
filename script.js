function updateLocalStorageRemoveItem(event) { // When the client remove something from the cart, the local storage will update.
  const liCartItem = document.querySelectorAll('.cart__item');
  // Author: Jeb50 obj: get position of 'li' in list ref: https://stackoverflow.com/questions/18295673/javascript-find-li-index-within-ul
  const positionLi = Array.prototype.indexOf.call(liCartItem, event.target); 
  const updatedStorage = JSON.parse(getSavedCartItems());
  updatedStorage.splice(positionLi, 1);
  localStorage.setItem('cartItems', JSON.stringify(updatedStorage));
}

function cartItemClickListener(event) {
  updateLocalStorageRemoveItem(event);
  event.target.remove(); // Remove order from Cart
}

function createCartItemElement({ id, title, price }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${id} | NAME: ${title} | PRICE: $${price}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function appendListCartItem(itemObject) {
  const ol = document.querySelector('.cart__items');

  ol.append(createCartItemElement(itemObject));
}

function updateLocalStorageAddItem(itemObject) {
  const oldList = JSON.parse(localStorage.getItem('cartItems'));
  oldList.push(itemObject);
  saveCartItems(JSON.stringify(oldList));
}

function initialRenderization() {
  const getLocalStorageItens = getSavedCartItems();
  console.log(getLocalStorageItens);
  if (getLocalStorageItens === undefined) {
    localStorage.setItem('cartItems', JSON.stringify([]));
  } else {
    JSON.parse(getLocalStorageItens).forEach((item) => appendListCartItem(item));
  }
}

async function cartItemToBeCreated(itemID) {
  const resultPromise = await fetchItem(itemID);

  appendListCartItem(resultPromise);
  updateLocalStorageAddItem(resultPromise); // When the client send something to the cart, the local storage will update.
}

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function addCartClickListener(event) {
  const idProduct = event.target
    .parentNode
    .firstChild
    .innerText;
  cartItemToBeCreated(idProduct);
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  
  if (element === 'button') {
    e.addEventListener('click', addCartClickListener);
  }

  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ id, title, thumbnail }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function appendSectionProductItem(productObject) {
  const section = document.querySelector('.items');

  section.append(createProductItemElement(productObject));
}

async function productsToBeCreated() {
  const resultPromise = await fetchProducts('computador');

  resultPromise.results
    .forEach((productSummarized) => appendSectionProductItem(productSummarized));
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

window.onload = () => {
  initialRenderization();
  productsToBeCreated();
};
