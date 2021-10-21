// const { fetchProducts } = require("./helpers/fetchProducts");

// const { fetchItem } = require("./helpers/fetchItem");

const itemClass = document.querySelector('.items');
const cartItemsClass = document.querySelector('.cart__items');

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
  // coloque seu código aqui
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
};

const addElementToCart = (event) => {
  const eventTarget = event.target;
  const eventId = eventTarget.parentNode.firstChild.innerText;
  getCartElement(eventId);
};

window.onload = () => { 
  getProductsSection();
  itemClass.addEventListener('click', addElementToCart);
  cartItemsClass.addEventListener('click', cartItemClickListener);
};