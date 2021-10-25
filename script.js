const cartList = document.querySelector('.cart__items');
const cleanButton = document.querySelector('.empty-cart');
const listOfItems = document.querySelector('.items');

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

const getTotalPrice = () => {
  const totalprice = document.querySelector('.total-price');
  const regExp = /MLB[0-9]{9}[0-9]?/;
  totalprice.innerText = 0;
  const cartItems = document.querySelectorAll('.cart__item');
  cartItems.forEach(async (item) => {
    const itemID = item.innerText.match(regExp)[0];
    const itemObject = await fetchItem(itemID);
    totalprice.innerText = (Number(totalprice.innerText) + itemObject.price);
  });
};

function cartItemClickListener(event) {
  cartList.removeChild(event.target);
  saveCartItems(cartList.innerHTML);
  getTotalPrice();
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const addProductsToCart = async (event) => {
  const identification = getSkuFromProductItem(event.target.parentNode);
  const item = await fetchItem(identification);
  const element = createCartItemElement(item);
  cartList.appendChild(element);
  saveCartItems(cartList.innerHTML);
  getTotalPrice();
};

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  if (element === 'button') {
    e.addEventListener('click', addProductsToCart);
  }
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

const createItemsObject = (items) => {
  items.forEach((item) => listOfItems.appendChild(createProductItemElement({
    sku: item.id,
    name: item.title,
    image: item.thumbnail,
  })));
};

const renderListOfProducts = () => {
  fetchProducts('computador')
    .then((response) => createItemsObject(response.results));
};

const addClickListenerToStorageItems = () => {
  const items = document.querySelectorAll('.cart__item');
  if (items.length !== 0) {
    items.forEach((item) => {
      item.addEventListener('click', cartItemClickListener);
    });
  }
};

loadStorageCartItems = () => {
  cartList.innerHTML = getSavedCartItems();
  getTotalPrice();
};

const cleanCart = () => {
  cleanButton.addEventListener('click', () => {
    total = 0;
    localStorage.clear();
    cartList.innerText = '';
    getTotalPrice();
  });
};

const loadingListOfItems = () => {
  const loading = document.createElement('p');
  loading.classList.add('loading');
  loading.innerText = 'carregando';
  listOfItems.appendChild(loading);
  setTimeout(() => {
    listOfItems.removeChild(loading);
    renderListOfProducts();
  }, 1000);
};

window.onload = () => {
  loadingListOfItems();
  loadStorageCartItems();
  addClickListenerToStorageItems();
  cleanCart();
};
