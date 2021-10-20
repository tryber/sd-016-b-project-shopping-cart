const getCartItemsOL = document.getElementsByClassName('cart__items')[0];
const getItemsSection = document.getElementsByClassName('items')[0];
const getItemsContainer = document.querySelector('.items');

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

function createProductItemElement({ id, title, thumbnail }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  event.target.parentNode.removeChild(event.target);
}

function createCartItemElement({ id, title, price }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${id} | NAME: ${title} | PRICE: $${price}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function showProductItems() {
  const productsItems = await fetchProducts('computador')
    .then((result) => result.results);

  productsItems.forEach((product) => {
    getItemsSection.appendChild(createProductItemElement(product));
  });
}

async function addCartItems(productID) {
  const product = await fetchItem(productID);

  getCartItemsOL.appendChild(createCartItemElement(product));
}

getItemsContainer.addEventListener('click', (e) => {
  if (e.target && e.target.classList.contains('item__add')) {
    const productClickedID = e.target.parentNode.firstChild.innerText;
    addCartItems(productClickedID);
  }
});

window.onload = () => {
  showProductItems();
 };
