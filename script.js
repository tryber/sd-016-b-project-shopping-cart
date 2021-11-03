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

function createProductItemElement({sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const addButtom = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  addButtom.addEventListener('click', addCartItem);
  section.appendChild(addButtom);

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

const load = document.querySelector('.loading');

function loading() {
  load.innerHTML = 'carregando';
}

async function addCartItem(event) {
  const cartItems = document.querySelector('.cart__items');
  const id = getSkuFromProductItem(event.target.parentNode);
  const productElement = await fetchItem(id);
  const createCartItem = createCartItemElement(productElement);
  cartItems.appendChild(createCartItem);
}

async function searchProducts(product) {
  const searchData = await fetchProducts(product);
  const sectionItems = document.querySelector('.items');
  searchData.results.forEach((item) => {
    const itemObject = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    }
    const productItem = createProductItemElement(itemObject);
    sectionItems.appendChild(productItem);
  })
}

function emptyButton() {
  const cartItems = document.querySelector('.cart__items');
  const btnEmpty = document.querySelector('.empty-cart');
  btnEmpty.addEventListener('click', () => {
    cartItems.innerHTML = ' ';
  })
}

window.onload = () => {
  searchProducts('computador');
  emptyButton();
};
