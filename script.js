const allItemsInCart = document.querySelector('.cart__items');
const cartItemsSection = document.querySelector('.cart');
const cleanButton = document.querySelector('.empty-cart');

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

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'),
  );
  return section;
}

const catchPrice = (string) => {
  const priceText = string.slice(-10);
  const valueText = priceText.replace(/[^0-9.]/g, '');
  const valueNumber = Number(valueText);
  return valueNumber;
};

const sumItems = () => {
  const allItems = [...document.querySelectorAll('.cart__item')];
  const mapValues = allItems.map((item) => catchPrice(item.innerText));
  const price = mapValues.reduce((sum, total) => (sum + total), 0);
  return price;
};

const addTotalToPage = () => {
  document.querySelector('.total-price').innerText = sumItems();
};

function cartItemClickListener(event) {
  const eventTarget = event.target;
  eventTarget.remove();
  addTotalToPage();
  saveCartItems(allItemsInCart.innerHTML);
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const productsList = async () => {
  const products = await fetchProducts('computador');
  const items = document.getElementsByClassName('items')[0];
  products.results.forEach((product) => {
    const display = createProductItemElement(product);
    items.appendChild(display);
  });
};

function getId(e) {
  const innerId = e.target.parentNode.firstChild.innerText;
  return innerId;
}

const addItemCartElement = async (id) => {
  const item = await fetchItem(id);
  const addProduct = createCartItemElement(item);
  document.getElementsByClassName('cart__items')[0].appendChild(addProduct);
  addTotalToPage();
  saveCartItems(allItemsInCart.innerHTML);
};

function loadItemsInCart() {
  const loadItems = getSavedCartItems();
  allItemsInCart.innerHTML = loadItems;
}

function addLoading() {
  document.querySelector('body').appendChild(createCustomElement('div', 'loading', 'loading...'));
}

function removeLoading() {
  document.querySelector('.loading').remove();
}

function eventListeners() {
  document.addEventListener('click', function (e) {
    if (e.target && e.target.classList.contains('item__add')) {
      addItemCartElement(getId(e));
    }
    if (e.target && e.target.classList.contains('cart__item')) {
      cartItemClickListener(e);
    }
  });
}

const executeFunctions = () => {
  addLoading();
  productsList()
    .then(() => loadItemsInCart())
    .then(() => eventListeners())
    .then(() => removeLoading());
};

window.onload = () => {
  executeFunctions();
  cartItemsSection.appendChild(createCustomElement('div', 'total-price', ''));
};

cleanButton.addEventListener('click', function () {
  allItemsInCart.innerHTML = '';
  document.querySelector('.total-price').innerText = '';
  saveCartItems(allItemsInCart.innerHTML);
});
