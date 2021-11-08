const cart = document.querySelector('.cart__items');

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

const totalElement = document.querySelector('.total-price');

let allPrices = [];
const reduce = (accumulator, currentValue) => accumulator + currentValue;
const total = () => allPrices.reduce(reduce, 0);

function addPrice(price) {
  allPrices.push(price);
  totalElement.innerHTML = `${total()}`;
  localStorage.setItem('total', JSON.stringify(allPrices));
}

function removePrice(index) {
  allPrices.splice(index, 1);
  totalElement.innerHTML = `${total()}`;
  localStorage.setItem('total', JSON.stringify(allPrices));
}

function clickItem(event) {
  const itemClicked = event.target;
  const itemClickedIndex = Array.from(cart.children).indexOf(itemClicked);
  removePrice(itemClickedIndex);

  itemClicked.remove();

  saveCartItems(cart.innerHTML);
}

function createItem({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', clickItem);
  return li;
}

const loadElem = document.querySelector('.loading');

async function computerListCreate() {
  const computerList = await fetchProducts('computer');
  loadElem.remove();
  computerList.results.forEach((computer) => {
    const skuNameImage = {
      sku: computer.id,
      name: computer.title,
      image: computer.thumbnail,
    };
    const itemListElem = document.querySelector('.items');
    const createSection = createProductItemElement(skuNameImage);
    itemListElem.appendChild(createSection);
  });
}

async function ItemAdd(event) {
  const eventSection = event.target.parentElement;
  const fetchItemData = await fetchItem(getSkuFromProductItem(eventSection));

  const skuNameSalePrice = {
    sku: fetchItemData.id,
    name: fetchItemData.title,
    salePrice: fetchItemData.price,
  };

  addPrice(skuNameSalePrice.salePrice);
  const newLiItem = createItem(skuNameSalePrice);
  newLiItem.addEventListener('click', clickItem);
  cart.appendChild(newLiItem);

  saveCartItems(cart.innerHTML);
}

function ListenerButton() {
  const buttonAdd = document.querySelectorAll('.item__add');
  buttonAdd.forEach((button) => {
    button.addEventListener('click', ItemAdd);
  });
}

function listenerItem() {
  const items = document.querySelectorAll('.cart__item');
  items.forEach((item) => {
    item.addEventListener('click', clickItem);
  });
}

function clearItems() {
  allPrices.splice(0, allPrices.length);
  localStorage.setItem('total', JSON.stringify(allPrices));

  totalElement.innerHTML = `${total()}`;
  cart.innerHTML = '';
  saveCartItems(cart.innerHTML);
}

const clearItemsButton = document.querySelector('.empty-cart');
clearItemsButton.addEventListener('click', clearItems);

function CartReset() {
  const savedCartItems = localStorage.getItem('cartItems');
  cart.innerHTML = savedCartItems;
}

async function createPage() {
  await computerListCreate();
  ListenerButton();
}

window.onload = () => {
  createPage();
  CartReset();
  listenerItem();
  if (localStorage.getItem('cartItems') === null) return localStorage.setItem('total', []);
  allPrices = JSON.parse(localStorage.getItem('total'));
  totalElement.innerHTML = `${total()}`;
};