const cartItems = document.querySelector('.cart__items');
const emptyCartButton = document.querySelector('.empty-cart');
const loading = document.createElement('p');
const totalValue = document.querySelector('.total-price')

const totalValueSaver = (element) => {
  localStorage.setItem('totalValue', element);
}

const totalValueRetriever = () => (
  localStorage.getItem('totalValue')
)

function cartItemClickListener(event) {
  event.target.remove();
  saveCartItems(cartItems.innerHTML);
}

const emptyCart = () => {
  while (cartItems.firstChild) {
    cartItems.removeChild(cartItems.firstChild);
  }
  totalValue.innerHTML = 0;
  saveCartItems(cartItems.innerHTML);
  totalValueSaver(totalValue.innerHTML);
};

emptyCartButton.addEventListener('click', emptyCart);

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.addEventListener('click', cartItemClickListener);
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  return li;
}

const throwInCart = async (event) => {
  const getSku = getSkuFromProductItem(event.target.parentNode);
  const item = await fetchItem(getSku);
  const cartList = document.querySelector('.cart__items');
  const createElement = createCartItemElement(item);
  cartList.appendChild(createElement);
  saveCartItems(cartItems.innerHTML);
};

const addPrice = async (event) => {
  const getItemSku = getSkuFromProductItem(event.target.parentNode);
  const item = await fetchItem(getItemSku);
  const getPrice = await item.base_price;
  totalValue.innerHTML = parseFloat(totalValue.innerHTML) + getPrice;
  totalValueSaver(totalValue.innerHTML);
}

const subtractPrice = async (event) => {
  const getItemSku = event.target.innerHTML.slice(5,18);
  const item = await fetchItem(getItemSku);
  const getPrice = item.base_price;
  totalValue.innerHTML = parseFloat(totalValue.innerHTML) - getPrice;
  totalValueSaver(totalValue.innerHTML);
}

const createProductItemElement = ({ id: sku, title: name, thumbnail: image }) => {
  const section = document.createElement('section');
  section.className = 'item';
  const button = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  button.addEventListener('click', throwInCart);
  button.addEventListener('click', addPrice);
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(button);
  return section;
};

const itemSection = document.querySelector('.items');
loading.classList = 'loading';
loading.innerText = 'carregando...';
itemSection.appendChild(loading);

const createItems = async () => {
  const allItems = await fetchProducts('computador');
  itemSection.removeChild(itemSection.firstChild);
  return allItems.forEach((item) => {
    const createElement = createProductItemElement(item);
    itemSection.append(createElement);
  });
};

window.onload = async () => {
  createItems();
  totalValue.innerHTML = totalValueRetriever();
  cartItems.innerHTML = await getSavedCartItems();
  cartItems.addEventListener('click', cartItemClickListener);
  cartItems.addEventListener('click', subtractPrice);
};