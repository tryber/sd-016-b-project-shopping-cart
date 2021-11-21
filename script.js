const cartItem = document.querySelector('.cart__items');

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

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function getAllCartItems() {
  const cartItems = document.querySelectorAll('.cart__item');
  const allCartItems = [];
  cartItems.forEach((item) => {
    allCartItems.push(item.innerHTML);
  });
  return allCartItems;
}

function sumAllCartItems() {
  const allCartItem = document.querySelectorAll('.cart__item');
  const prices = [];
  allCartItem.forEach((item) => {
    prices.push(Number(item.innerText.split('PRICE: $')[1]));
  });
  const totalPrices = prices.reduce((previousValue, currentValue) => (
    previousValue + currentValue), 0);
  return totalPrices;
}

function appendTotalPrices() {
  const totalPrices = sumAllCartItems();
  const total = document.querySelector('.total-price');
  total.innerText = totalPrices;
}

function cartItemClickListener(event) {
  event.target.remove();
  saveCartItems(getAllCartItems());
  appendTotalPrices();
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function onClickEventItem(event) {
  const targetItem = event.target.parentElement;
  const itemId = getSkuFromProductItem(targetItem);
  const itemData = await fetchItem(itemId);
  cartItem.appendChild(createCartItemElement(itemData));
  saveCartItems(getAllCartItems());
  appendTotalPrices();
}

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));

  const eventButton = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  eventButton.addEventListener('click', onClickEventItem);
  section.appendChild(eventButton);

  return section;
}

function mapAllProducts(products) {
  const root = document.querySelector('.items');
  return products.map((product) => (
    root.appendChild(createProductItemElement(product)) 
  ));
}

function restoreCartItemsFromLocalStorage() {
  const restoredCartList = JSON.parse(getSavedCartItems());
  if (restoredCartList) {
    restoredCartList.forEach((item) => {
      const li = document.createElement('li');
      li.className = 'cart__item';
      li.innerText = item;
      li.addEventListener('click', cartItemClickListener);
      cartItem.appendChild(li);
      appendTotalPrices();
    });
  }
}

function clearCart() {
  const fatherElement = cartItem;
  while (fatherElement.firstChild) {
    fatherElement.removeChild(fatherElement.lastChild);
  }
  appendTotalPrices();
}

function createLoadElement() {
  const loadElement = document.createElement('div');
  loadElement.className = 'loading';
  loadElement.innerText = 'carregando...';
  document.querySelector('body').appendChild(loadElement);
}

function removeLoadElement() {
  document.querySelector('.loading').remove();
}

window.onload = async () => {
  createLoadElement();
  const searchResult = await fetchProducts('computador');
  removeLoadElement();
  mapAllProducts(searchResult);
  restoreCartItemsFromLocalStorage();
  sumAllCartItems();
  const clearButton = document.querySelector('.empty-cart');
  clearButton.addEventListener('click', clearCart);
 };
