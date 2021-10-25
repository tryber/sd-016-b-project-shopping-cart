const olItem = document.querySelector('.cart__items');
const productItems = document.querySelector('.items');

function itemsSavedLocalStorage() {
  const loadItems = getSavedCartItems();
  olItem.innerHTML = loadItems;
}

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function cartItemClickListener(event) {
  const removeItem = event.target;
  removeItem.remove();
  saveCartItems(olItem.innerHTML);
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function getSkuFromProductItem(event) {
  const abc = event.target.parentNode.querySelector('span.item__sku').innerText;
  fetchItem(abc)
  .then((data) => olItem.appendChild(createCartItemElement(data)));
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  if (element === 'button') {
    e.addEventListener('click', getSkuFromProductItem);
  }
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

function alheioS() {
  fetchProducts('computador')
    .then((data) => data.results
    .forEach((element) => productItems.appendChild(createProductItemElement(element))));
    saveCartItems(olItem.innerHTML);
}

window.onload = () => {
  itemsSavedLocalStorage();
  alheioS();
 };