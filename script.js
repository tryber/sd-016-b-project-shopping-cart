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
  // coloque seu código aqui
  const ol = event.target.parentElement;
  ol.removeChild(event.target);
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const takeProductsAndShowThem = async () => {
  const computers = await fetchProducts('computador');
  const section = document.querySelector('.items');
  computers.forEach((computer) => {
    section.appendChild(createProductItemElement(computer));
  });
};

const addToCart = (computer) => {
  const ol = document.querySelector('.cart__items');
  ol.appendChild(createCartItemElement(computer));
};

const addToCartClickListener = async (event) => {
  const section = event.target.parentElement;
  const id = section.firstChild.innerHTML;
  const computer = await fetchItem(id);
  addToCart(computer);
};

const getID = async () => {
  await takeProductsAndShowThem();
  const buttons = document.querySelectorAll('.item__add');
  buttons.forEach((button) => {
    button.addEventListener('click', addToCartClickListener);
  });
};

window.onload = () => {
  getID();
};
