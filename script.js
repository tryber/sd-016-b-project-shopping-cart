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
  const itemsList = document.querySelector('.cart__items');

  itemsList.removeChild(event.target);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function appendItemToCart(event) {
  const itemId = event.target.parentElement.firstChild.innerText;
  const product = await fetchItem(itemId);
  const itemsList = document.querySelector('.cart__items');

  const productObject = {
    sku: product.id,
    name: product.title,
    salePrice: product.price,
  };

  itemsList.appendChild(createCartItemElement(productObject));
}

function enableProductsButtonsClickEvent() {
  const buttons = document.querySelectorAll('.item__add');
  buttons.forEach((button) => {
    button.addEventListener('click', appendItemToCart);
  });
}

async function getProducts(productName) {
  const products = await fetchProducts(productName);
  const sectionItems = document.querySelector('.items');

  products.results.forEach((product) => {
    const productObject = {
      sku: product.id,
      name: product.title,
      image: product.thumbnail,
    };

    sectionItems.appendChild(createProductItemElement(productObject));
  });

  enableProductsButtonsClickEvent();
}

window.onload = () => {
  getProducts('computador');
};
