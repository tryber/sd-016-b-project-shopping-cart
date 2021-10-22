const cartList = document.querySelector('.cart__items');
const cleanButton = document.querySelector('.empty-cart');
const listOfItems = document.querySelector('.items');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function cartItemClickListener(event) {
  cartList.removeChild(event.target);
 return saveCartItems(cartList.innerHTML);
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const addProductsToCart = (event) => {
  const identification = event.target.previousSibling.previousSibling.previousSibling.innerText;
  fetchItem(identification).then((response) => {
        const element = createCartItemElement(response);
        cartList.appendChild(element);
        return saveCartItems(cartList.innerHTML);
  });
};

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  if (element === 'button') {
    e.addEventListener('click', addProductsToCart);
  }
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

const createItemsObject = (items) => {
  items.forEach((item) => listOfItems.appendChild(createProductItemElement({
    sku: item.id,
    name: item.title,
    image: item.thumbnail,
  })));
};

const renderListOfProducts = () => {
  fetchProducts('computador')
    .then((response) => createItemsObject(response.results));
};

addClickListenerToStorageItems = () => {
  const items = document.querySelectorAll('.cart__item');
  if (items.length !== 0) {
    items.forEach((item) => {
      item.addEventListener('click', cartItemClickListener);
    });
  }
};

loadStorageCartItems = () => {
  cartList.innerHTML = getSavedCartItems();
};

window.onload = () => {
  renderListOfProducts();
  loadStorageCartItems();
  addClickListenerToStorageItems();
};
