const olItem = document.querySelector('.cart__items');
const productItems = document.querySelector('.items');
const emptyCart = document.querySelector('.empty-cart');

const empty = () => {
  olItem.innerHTML = '';
  saveCartItems(olItem.innerHTML);
};
emptyCart.addEventListener('click', empty);

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function cartItemClickListener(event) {
  event.target.remove();
  saveCartItems(olItem.innerHTML);
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}
// 2
const getSkuFromProductItem = (event) => {
  const abc = event.target.parentNode.querySelector('span.item__sku').innerText;
  console.log(abc);
  fetchItem(abc)
  .then((data) => {
    olItem.appendChild(createCartItemElement(data));
    saveCartItems(olItem.innerHTML);
  });
};

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  if (element === 'button') {
    e.addEventListener('click', getSkuFromProductItem);
  }
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ id: sku, title: name, thumbnail: image } = products) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  
  return section;
}

function eraseItems() {
  olItem.innerHTML = getSavedCartItems();
  const localItems = document.querySelectorAll('.cart__items');
  localItems.forEach((element) => element.addEventListener('click', cartItemClickListener));
}

// 1
fetchProducts('computador')
.then((data) => data.results
.forEach((element) => productItems.appendChild(createProductItemElement(element))));

window.onload = () => {
  eraseItems();
};
