const getCart = document.querySelector('.cart__items');
const getItems = document.querySelector('.items');
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
  // coloque seu código aqui
  const item = event.target;
  item.remove();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const elementItem = async () => { // falta testar
const arrProducts = await fetchProducts('computador');
const arrResults = arrProducts.results
.map((product) => ({ sku: product.id, name: product.title, salePrice: product.price }));
arrResults.forEach((element) => getItems.appendChild(createProductItemElement(element)));
};

const cartElement = async (param) => { // falta testar
const item = await fetchItem(param);
const { id, title, price } = item;
const objItem = {
  sku: id,
  name: title,
  salePrice: price,
};
const element = createCartItemElement(objItem);
getCart.appendChild(element);
};

window.onload = () => {
  elementItem();
  cartElement('MLB1615760527');
};
