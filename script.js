


// Get elements HTML
const cartItems = document.querySelector('.cart_items');
const totalPrice = document.querySelector('.total-price');
const loading = document.querySelector('.loading');

// Clean Cart
const cleanCart = () => {
  const btn = document.querySelector('.empty-cart');
  btn.addEventListener('click', () => {
    cartItems.innerHTML = '';
    totalPrice.innerText = '';
    localStorage.clear();
  });
};
// Img off product
function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};
// Return id off product
function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
};
// Save and refresh product on Local Storage
const saveLs = () => {
  const product = cartItems.innerHTML;
  saveCartItems(JSON.stringify(product));
};
// When refresh get the value in Local Storage
const getValueLs = () => totalPrice.innerHTML = localStorage.getItem('valueProduct');
// subtraindo valor produtos
const subValues = (event) => {
  const textItem = event.target.innerText;
  const arrItem = textItem.split(' ');
  const arrLengthPosition = arrItem[arrItem.length - 1];
  const value = arrLengthPosition.replace('$', '');
  let sub = Number(localStorage.getItem('valueProduct'));
  sub -= value;
  localStorage.setItem('valueProduct', s);
  totalPrice.innerText = sub;
};
// Remove product on cvart
function cartItemClickListener(event) {
  event.target.remove();
  subValues(event);
  saveLs();
};
// Fill the cart with Local Stortage
const getInfos = () => {
  const products = JSON.parse(getSavedCartItems());
  cartItems.innerHTML = products;

  const list = document.querySelectorAll('.cart_item');
  list.forEach((li) => li.addEventListener('click', cartItemClickListener));
};
// soma valores
const sumValues = (price) => {
  let sum = Number(localStorage.getItem('valueProduct'));
  sum += price;
  localStorage.setItem('valueProduct', sum);
  totalPrice.innerText = sum;
};
// Create the product to add cart
function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};
// Add product in cart
const selectedItem = async (event) => {
  const id = getSkuFromProductItem(event.target.parentNode);
  const element = await fetchItem(id);
  const cart = createCartItemElement(element);
  cartItems.appendChild(cart);
  saveLs();
};
// Create Prod
const addItems = async (product) => {
  await fetchProducts(product).then((results) => {
    const items = document.querySelector('.items');
    results.forEach((result) => {
      const item = createProductItemElement(result);
      items.appendChild(item);
    });
  });
};
window.onload = () => {
  addItems('computador');
};
