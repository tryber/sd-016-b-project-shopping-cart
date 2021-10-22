const theListShop = document.querySelector('.cart__items');
const totalPrice = [];
const btnErase = document.querySelector('.empty-cart');

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

function cartItemClickListener(event) {
  event.remove();
  saveCartItems(theListShop.innerHTML);
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', () => cartItemClickListener(li));
  
  return li;
}

const cartItems = async (item) => {
  const itemSearched = await fetchItem(item);
  
  theListShop.appendChild(createCartItemElement(itemSearched));
  saveCartItems(theListShop.innerHTML);
};

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';

  const btn = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  btn.addEventListener('click', () => cartItems(sku));
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(btn);

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

const fetchListItens = async (item) => {
  const fetchSpecifics = await fetchProducts(item);
  const listItems = document.querySelector('.items');
   return fetchSpecifics.forEach((element) => {
    listItems.appendChild(createProductItemElement(element));
  });
};

function eraseAll() {
  const allList = document.querySelector('.cart__items');

  btnErase.addEventListener('click', () => { allList.innerHTML = ''; });
}

function onStart() {
  const bringBack = getSavedCartItems();
  theListShop.innerHTML = bringBack;
  const oldList = document.querySelectorAll('.cart__item');
  oldList.forEach((element) => element
    .addEventListener('click', (e) => {
      element.remove(e);
      saveCartItems(theListShop.innerHTML);
    }));
}

// function totalPriceCreation(value) {
//   const prices = document.createElement('span');
//   prices.className = 'total-price';
//   prices.innerText = `Valor total: R$ ${value}`;

//   theListShop.appendChild(prices);
// }

// totalPriceCreation(50);

// function countPrices() {
//   // const 
// // }
eraseAll();

window.onload = () => { 
  fetchListItens('computador');
  onStart();
  // eraseAll();
};
