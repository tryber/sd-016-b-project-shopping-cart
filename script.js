// const { fetchProducts } = require("./helpers/fetchProducts");
// const getSavedCartItems = require("./helpers/getSavedCartItems");
// const saveCartItems = require("./helpers/saveCartItems");
// const { fetchItem } = require("./helpers/fetchItem");

const itemClass = document.querySelector('.items');
const cartItemsClass = document.querySelector('.cart__items');
const emptyCartClass = document.querySelector('.empty-cart');
const cartClass = document.querySelector('.cart');

const itemsPrice = async () => {
  const items = await cartItemsClass.childNodes;
  const totalPriceClass = document.querySelector('.total-price');
  if (items.length === 0) {
    totalPriceClass.innerText = 0;
  }
  const newArray = [];
  for (let index = 0; index < items.length; index += 1) {
    newArray.push(items[index].innerText.split(' '));
  }
  const pricesArray = newArray.map((price) => (price[price.length - 1]).substring(1));
  const numbersArray = pricesArray.map((number) => parseFloat(number));
  const result = numbersArray.reduce((acc, number) => acc + number);
  totalPriceClass.innerText = result;
};

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
  const eventTarget = event.target;
  eventTarget.remove();
  saveCartItems();
  itemsPrice();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const getProductsSection = async () => {
  const productsArray = await fetchProducts('computador');
  const createProductSection = productsArray.results
  .map((product) => ({
    sku: product.id,
    name: product.title,
    image: product.thumbnail,
    salePrice: product.price,
  }));
  createProductSection
  .forEach((product) => itemClass.appendChild(createProductItemElement(product)));
};

const getCartElement = async (ID) => {
  const returnedItem = await fetchItem(ID);

  const { id, title, price } = returnedItem;
  const objOfReturnedItem = {
    sku: id,
    name: title,
    salePrice: price,
  };
  cartItemsClass.appendChild(createCartItemElement(objOfReturnedItem));
  saveCartItems();
  itemsPrice();
};

const addElementToCart = (event) => {
  const eventTarget = event.target;
  const eventId = eventTarget.parentNode.firstChild.innerText;
  getCartElement(eventId);
};

const deflateCart = () => {
  cartItemsClass.innerHTML = '';
};

const createTotalPriceClass = () => {
  const p = document.createElement('p');
  p.className = 'total-price';
  p.innerText = 0;
  cartClass.appendChild(p);
};

window.onload = () => { 
  getProductsSection();
  itemClass.addEventListener('click', addElementToCart);
  cartItemsClass.addEventListener('click', cartItemClickListener);
  cartItemsClass.addEventListener('change', itemsPrice);
  emptyCartClass.addEventListener('click', deflateCart);
  getSavedCartItems();
  createTotalPriceClass();
  itemsPrice();
};