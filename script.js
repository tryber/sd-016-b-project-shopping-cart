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

function updateSubtotal(price) {
  const subtotal = document.querySelector('#subtotal');
  const currentValue = parseFloat(subtotal.innerText);
  const sum = currentValue + price;

  subtotal.innerText = `${sum}`;
}

function cartItemClickListener(event) {
  const item = event.target;
  const price = parseFloat(event.target.innerText.match(/(?<=PRICE: \$).*/));

  item.parentNode.removeChild(item);
  saveCartItems(cart.innerHTML);
  updateSubtotal(price * -1.0);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function toggleLoading() {
  const container = document.querySelector('.loading-container');
  if (!document.querySelector('.loading')) {
    container.classList.remove('invisible');
    container.appendChild(createCustomElement('span', 'loading', 'Carregando...'));
  } else {
  container.classList.add('invisible');
  container.innerHTML = '';
  }
}

async function pageItemClickListener(event) {
  const itemId = getSkuFromProductItem(event.target.parentNode);

  toggleLoading();
  const itemObj = await fetchItem(itemId);
  toggleLoading();

  const itemData = { sku: itemObj.id, name: itemObj.title, salePrice: itemObj.price };
  const itemElement = createCartItemElement(itemData);

  cart.appendChild(itemElement);
  saveCartItems(cart.innerHTML);
  updateSubtotal(itemObj.price);
}

async function searchProducts(product) {
  toggleLoading();
  const searchData = await fetchProducts(product);
  toggleLoading();
  const itemsSection = document.querySelector('.items');

  searchData.results.forEach((item) => {
    const itemObj = { sku: item.id, name: item.title, image: item.thumbnail };
    const productElement = createProductItemElement(itemObj);
    productElement.lastChild.addEventListener('click', pageItemClickListener);
    itemsSection.appendChild(productElement);
  });
}

function restoreCart() {
  cart.innerHTML = getSavedCartItems();
  const cartItems = document.querySelectorAll('.cart__item');
  cartItems.forEach((item) => item.addEventListener('click', cartItemClickListener));
}

function emptyCartClickListener() {
  const button = document.querySelector('.empty-cart');
  button.addEventListener('click', () => {
    cart.innerHTML = '';
  });
  // TODO: atualizar localStorage
}

window.onload = () => {
  searchProducts('computador');
  restoreCart();
  emptyCartClickListener();
};
