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

function cartItemClickListener(event) {
  const item = event.target;  
  item.parentNode.removeChild(item);
  saveCartItems(cart.innerHTML);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function pageItemClickListener(event) {
  const itemId = getSkuFromProductItem(event.target.parentNode);
  const itemObj = await fetchItem(itemId);
  const itemData = { sku: itemObj.id, name: itemObj.title, salePrice: itemObj.price };
  const itemElement = createCartItemElement(itemData);

  cart.appendChild(itemElement);
  saveCartItems(cart.innerHTML);
}

async function searchProducts(product) {
  const searchData = await fetchProducts(product);
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

window.onload = () => {
  searchProducts('computador');
  restoreCart();
};
