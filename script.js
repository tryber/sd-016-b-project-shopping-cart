const q = (id) => document.querySelector(id);
const qAll = (id) => document.querySelectorAll(id);
const cartItems = q('.cart__items');
const sectionItems = q('.items');

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

sectionItems.appendChild(createCustomElement('h1', 'loading', 'carregando...'));

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

const cartSum = async () => {
  const result = await Array.from(cartItems.childNodes).reduce((prev, curr) => {
    const price = curr.innerText.split('PRICE: $')[1];
    return prev + parseFloat(price);
  }, 0);
  q('.total-price').innerText = `${result}`;
};

function cartItemClickListener(event) {
  const currChild = event.target;
  cartItems.removeChild(currChild);
  saveCartItems(cartItems.innerHTML);
  cartSum();
}

function addListenner() {
  qAll('.cart__items').forEach((e) => e.addEventListener('click', cartItemClickListener));
  q('.empty-cart').addEventListener('click', () => {
    cartItems.innerHTML = '';
    saveCartItems(cartItems.innerHTML);
    cartSum();
  });
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  addListenner();
  return li;
}

const applyCarItem = (event) => {
  const ol = cartItems;
  const id = event.target.parentNode.firstChild.innerText;
  fetchItem(id).then((data) => {
    ol.appendChild(createCartItemElement(data));
    saveCartItems(cartItems.innerHTML);
    cartSum();
  });
};

const applyItemElements = () => {
  fetchProducts('computador').then((el) => el
  .forEach((item) => {
    sectionItems.appendChild(createProductItemElement(item));
    const currButton = q('.items').lastChild.lastChild;
    currButton.addEventListener('click', (e) => applyCarItem(e));
  })).then(() => sectionItems.removeChild(q('.loading')));
};

window.onload = () => {
  applyItemElements();
  // setTimeout(applyItemElements, 500);
  cartItems.innerHTML = getSavedCartItems();
  addListenner();
  cartSum();
};
