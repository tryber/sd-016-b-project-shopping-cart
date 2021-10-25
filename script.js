const olItem = document.querySelector('.cart__items');
const productItems = document.querySelector('.items');
const emptyCart = document.querySelector('.empty-cart');
const loading = document.querySelector('#carregando');
const totalPrice = document.querySelector('.total-price');
let initialPrice = 0;

// Botão de esvaziar o carrinho
const empty = () => {
  olItem.innerHTML = '';
  totalPrice.innerText = 0;
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
  olItem.removeChild(event.target);
  const price = event.target.innerText.split('$').length - 1;
  const removePrice = event.target.innerText.split('$')[price];
  initialPrice -= removePrice;
  totalPrice.innerText = initialPrice;
  saveCartItems(olItem.innerHTML);
}

const sumPrices = (data) => {
  initialPrice += data;
  totalPrice.innerText = initialPrice;
};

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  // li.addEventListener('click', cartItemClickListener);
  return li;
}
// 2
const getSkuFromProductItem = async (event) => {
  const id = event.target.parentNode.querySelector('span.item__sku').innerText;
  await fetchItem(id)
  .then((data) => {
    olItem.appendChild(createCartItemElement(data));
    saveCartItems(olItem.innerHTML);
    sumPrices(data.price);
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

function eraseLoad() {
  loading.innerHTML = '';
}

// 1
fetchProducts('computador')
.then((data) => {
  data.results
.forEach((element) => productItems.appendChild(createProductItemElement(element)));
eraseLoad();
});

window.onload = () => {
  eraseItems();
};
