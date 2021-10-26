const importantElements = {
  cartItems: document.querySelector('.cart_items'),
  allItems: document.querySelector('.items'),
  emptyCart: document.querySelector('.empty-cart'),
  subTotal: document.querySelector('.total-price'),
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

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
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

const actualSubTotal = () => {
  const subTotal = importantElements.subTotal.innerText;

  localStorage.setItem('subTotal', subTotal);
};

const getActualSubTotal = () => {
  if (localStorage.getItem('subTotal')) {
    const subTotal = localStorage.getItem('subTotal');
  }
}
// https://github.com/tryber/sd-016-b-project-shopping-cart/pull/9/files
// https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/RegExp
function cartItemClickListener(event) {
  const cartProduct = event.target;
  const regexToCompair = new RegExp(/\w*: \$(?<price>\d*.\d{0,2})$/);
  const price = cartProduct.innerText.match((regexToCompair)[1]);
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const addItems = async (product) => {
  await fetchProducts(product).then((results) => {
    const items = document.querySelector('.items');
    results.forEach((result) => {
      const item = createProductItemElement(result);
      items.appendChild(item);
    });
  });
};

const addItemToCart = (sku) => {
  const cart = document.querySelector('.cart_items');
  fetchItem(sku)
    .then((product) =>)
}
window.onload = () => {
  addItems('computador');
};
