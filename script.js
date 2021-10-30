const getCartItems = document.querySelector('.cart__items');
const getItems = document.querySelector('.items');
const getCart = document.querySelector('.cart');
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
const countPrice = async () => {
  const cartItems = await getCartItems.childNodes;
  const getTotal = document.querySelector('.total-price');
  if (cartItems.length === 0) {
    getTotal.innerText = 0;
  }
  const arrayItems = [];
  for (let index = 0; index < cartItems.length; index += 1) {
    arrayItems.push(cartItems[1].innerText.split(' '));
  }
  const arrayPrices = arrayItems.map((item) => (item[item.length - 1]).substring(1));
  const arrayNumbers = arrayPrices.map((number) => parseFloat(number));
  const count = arrayNumbers.reduce((acc, number) => acc + number);
  getTotal.innerText = count;
};

function cartItemClickListener(event) {
  const item = event.target;
  item.remove();
  saveCartItems();
  countPrice();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const elementItem = async () => {
  const arrProducts = await fetchProducts('computador');
  const arrResults = arrProducts.results
  .map((product) => ({ sku: product.id, name: product.title, salePrice: product.price }));
  arrResults.forEach((element) => getItems.appendChild(createProductItemElement(element)));
  console.log(arrProducts);
  };

const addElement = async (parameter) => {
const item = await fetchItem(parameter);
const { id, title, price } = item;
const itemObject = {
  sku: id,
  name: title,
  salePrice: price,
};
const element = createCartItemElement(itemObject);
getCartItems.appendChild(element);
saveCartItems();
countPrice();
};
const addCartElement = (event) => {
  const item = event.target;
  const id = item.parentNode.firstChild.innerText;
  addElement(id);
};
const insetPrice = () => {
  const createPrice = document.createElement('price');
  createPrice.className = 'total-price';
  createPrice.innerText = 0;
  getCart.appendChild(createPrice);
};
  
  window.onload = () => {
    elementItem();
    getCartItems.addEventListener('click', cartItemClickListener);
    getItems.addEventListener('click', addCartElement);
    getCartItems.addEventListener('change', countPrice);
    getSavedCartItems();
    insetPrice();
    countPrice();
 };
