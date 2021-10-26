function createLoadScreen() {
  const body = document.querySelectorAll('body');
  const span = document.createElement('span');
  span.className = 'loading';
  span.innerText = 'loading...';
  body[0].insertBefore(span, body[0].children[0]);  
}

function removeLoadScreen() {
  const loadScreen = document.querySelector('.loading');
  loadScreen.remove();
}

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function getItemsCart() {
  const arr = [];
  const items = document.querySelectorAll('.cart__item');
  items.forEach((currV, index) => arr.push(items[index].innerText));
  return arr;
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

function getCartItems() {
  return document.querySelectorAll('.cart__item');
}

function totalPrice() {
  const newCartItem = getCartItems();
  const priceText = document.querySelector('.total-price');
  let count = 0;  
  newCartItem.forEach((item) => {    
    const splitString = item.innerText.split(' ');    
    const priceString = splitString.pop();
    const priceWithoutChar = priceString.replace('$', '');
    const priceInteger = parseFloat(priceWithoutChar, 10);    
    count += priceInteger;    
  });
  priceText.innerText = count;
  if (count === 0) { // se der erro pode ser isso req 3
    priceText.innerText = '';
  }
}

function buttonRm(event) {
  const remove = event.target.remove();
  totalPrice();
  saveCartItems(getItemsCart());
  return remove;
}

function cartItemClickListener(listener) {
  // coloque seu código aqui  
  const newCartItem = getCartItems();
  newCartItem.forEach((item) => {
    item.addEventListener('click', buttonRm(listener));
  });
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function createPriceSection() {
  const cartSection = document.querySelector('.cart');
  const price = document.createElement('span');
  price.className = 'total-price';  
  cartSection.appendChild(price);
}

async function searchId(id) {
  const findId = await fetchItem(id);
  const cartItem = document.querySelector('.cart__items');
  const obj = {      
    sku: findId.id,
    name: findId.title,
    salePrice: findId.price,
  };
  const createCartItem = createCartItemElement(obj);  
  cartItem.appendChild(createCartItem);
  totalPrice();
  saveCartItems(getItemsCart());
  return findId;
}

function createEventListener() {
  const buttons = document.querySelectorAll('.item__add');
  buttons.forEach((button) => button.addEventListener('click', (event) => {
    const id = event
      .target.previousElementSibling.previousElementSibling.previousElementSibling.innerText;
    searchId(id);    
  }));  
}

async function searchProduct(product) {
  const searchData = await fetchProducts(product);
  const sectionItem = document.querySelector('.items');
  removeLoadScreen();
  searchData.results.forEach((item) => {
    const obj = {      
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    };
    const productItem = createProductItemElement(obj);
    sectionItem.appendChild(productItem);    
  });
  createEventListener();
}

function cleanCart() {  
  const priceText = document.querySelector('.total-price');
  const cleanButton = document.querySelector('.empty-cart');
  cleanButton.addEventListener('click', () => {
    const newCartItem = getCartItems();    
    newCartItem.forEach((item) => {
      item.remove();
      saveCartItems(getItemsCart());
    });
    priceText.innerText = '';    
  });  
}

function teste() {
  // coloque seu código aqui  
  const newCartItem = getCartItems();
  newCartItem.forEach((item) => {
    item.addEventListener('click', () => {
      item.remove();
      totalPrice();
      saveCartItems(getItemsCart());
    });    
  });
}

function storageCart() {
  const getItem = getSavedCartItems();  
  const getItemSplit = getItem.split(',SKU:');
  const cartItems = document.querySelector('.cart__items');
  for (let index = 0; index < getItemSplit.length; index += 1) {
    if (index !== 0) {
      const li = document.createElement('li');
      li.className = 'cart__item';
      li.innerText = `SKU:${getItemSplit[index]}`;
      cartItems.appendChild(li);        
    } else {
      const li = document.createElement('li');
      li.className = 'cart__item';
      li.innerText = getItemSplit[index]; 
      cartItems.appendChild(li);  
    }
  }
  teste();  
  totalPrice();   
}

function storageItem() {
  const getItem = getSavedCartItems();
  if (getItem !== null && getItem !== '') {
    storageCart();
  }
}

window.onload = () => {
  createLoadScreen();
  searchProduct('computador');
  createPriceSection();
  cleanCart(); 
  storageItem();
};
