const getCartItemsOL = document.querySelector('.cart__items');
const getItemsSection = document.querySelector('.items');
const getButtonEmptyCart = document.querySelector('.empty-cart');

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

function addLoadingText() {
  const loading = createCustomElement('div', 'loading', 'carregando...');
  getItemsSection.appendChild(loading);
}

function removeLoadingText() {
  const loading = document.querySelector('.loading');
  loading.parentNode.removeChild(loading);
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  event.target.parentNode.removeChild(event.target);
  saveCartItems(getCartItemsOL.innerHTML);
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
  removeLoadingText();
}

async function addCartItems(productID) {
  const product = await fetchItem(productID);

  getCartItemsOL.appendChild(createCartItemElement(product));
}

getItemsSection.addEventListener('click', async (e) => {
  if (e.target && e.target.classList.contains('item__add')) {
    const productClickedID = e.target.parentNode.firstChild.innerText;
    await addCartItems(productClickedID);
    saveCartItems(getCartItemsOL.innerHTML);
  }
});

getButtonEmptyCart.addEventListener('click', () => {
  getCartItemsOL.innerText = '';
  saveCartItems(getCartItemsOL.innerHTML);
});

function getSavedCart() {
  getCartItemsOL.innerHTML = getSavedCartItems();
  const getCartItems = document.querySelectorAll('.cart__item');
  
  getCartItems.forEach((item) => item.addEventListener('click', cartItemClickListener));
}

window.onload = () => {
  addLoadingText();
  showProductItems();
  getSavedCart();
};
