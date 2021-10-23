const elementItems = document.querySelector('.items');
const cartItems = document.querySelector('.cart__items');
const clearItems = document.querySelector('.empty-cart');

function clearCart() {}

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function cartItemClickListener(event) {
  event.target.remove();
  saveCartItems(cartItems);
}

function createCartItemElement({
  id: sku,
  title: name,
  price: salePrice,
}) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function getSkuFromProductItem(item) {
  const itemID = item
    .target
    .parentNode
    .querySelector('span.item__sku')
    .innerText;
  fetchItem(itemID)
    .then((element) => {
      cartItems
        .appendChild(createCartItemElement(element));
        saveCartItems(cartItems);
    });
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

function createProductItemElement({
  id: sku,
  title: name,
  thumbnail: image,
}) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  return section;
}

const solve = () =>
  fetchProducts('computador')
  .then((response) => response.results
    .forEach((element) => {
      elementItems
        .appendChild(createProductItemElement(element));
    }));

const addEventClick = () => {
  cartItems.innerHTML = getSavedCartItems();
  const itemsShopping = document.querySelectorAll('.cart__items');
  itemsShopping.forEach((element) => {
    element.addEventListener('click', cartItemClickListener);
  });
};

window.onload = () => {
  solve();
  addEventClick();
};