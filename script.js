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
  const getClassItem = document.querySelector('.items');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  getClassItem.appendChild(section);

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  event.target.remove();
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}
const renderProductList = async () => {
  const listItems = await fetchProducts('computador');
  // console.log(listItems);
  listItems.forEach((item) => createProductItemElement(item));
};
// Ajuda do Gabriel Silvestre
const add = async (event) => {
  const sku = getSkuFromProductItem(event.target.parentNode);
  const cartItems = await fetchItem(sku);
  const getItem = document.querySelector('.cart__items');
  getItem.appendChild(createCartItemElement(cartItems));
};

const addProductToCart = () => {
  const itemBtn = document.querySelectorAll('.item__add');
  itemBtn.forEach((btn) => {
    btn.addEventListener('click', add);
  });
};
// addProductToCart();

window.onload = async () => {
 await renderProductList();
 addProductToCart();
};
