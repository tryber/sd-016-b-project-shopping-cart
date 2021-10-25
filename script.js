const q = (id) => document.querySelector(id);
// const qAll = (id) => document.querySelectorAll(id);

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

function cartItemClickListener(event) {
  const currChild = event.target;
  q('.cart__items').removeChild(currChild);
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const applyCarItem = (event) => {
  const ol = q('.cart__items');
  const id = event.target.parentNode.firstChild.innerText;
  fetchItem(id).then((data) => ol.appendChild(createCartItemElement(data)));
};

const applyItemElements = () => {
  const sectionItems = q('.items');
  fetchProducts('computador').then((items) => items
  .forEach((item) => {
    sectionItems.appendChild(createProductItemElement(item));
    const currButton = q('.items').lastChild.lastChild;
    currButton.addEventListener('click', (e) => applyCarItem(e));
  }));
};

window.onload = () => {
  applyItemElements();
};
