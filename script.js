const getCartItems = document.querySelector('.cart__items');
const getItems = document.querySelector('.items');
const getCart = document.querySelector('.cart');
const getEmptyButton = document.querySelector('.empty-cart');
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

const countPrice = async () => {
  const cartItens = await getCartItems.childNodes;
  const getTotal = document.querySelector('.total-price');
  if (cartItens.length === 0) {
    getTotal.innerText = 0;
  }
  const arrItens = [];
  for (let i = 0; i < cartItens.length; i += 1) {
    arrItens.push(cartItens[i].innerText.split(' '));
  }
  const arrPrices = arrItens.map((item) => (item[item.length - 1]).substring(1));// arr com os numeros em string/
  const arrNumbers = arrPrices.map((number) => parseFloat(number));
  const count = arrNumbers.reduce((acc, number) => acc + number);
  getTotal.innerText = count;
};

function cartItemClickListener(event) {
  // coloque seu código aqui
  const item = event.target;
  item.remove();
  // funcao q salva local storage
  saveCartItems();
  // contador
  countPrice();
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
  getCartItems.appendChild(element);
  // funcao q salva local storage
  saveCartItems();
  // contador
  countPrice();
};

const addCartElement = (event) => {
  const item = event.target;
  const id = item.parentNode.firstChild.innerText;
  cartElement(id);
}; 
const insertp = () => {
  const criap = document.createElement('p');
  criap.className = 'total-price';
  criap.innerText = 0;
  getCart.appendChild(criap);
};
const emptyCart = async () => {
  getCartItems.innerHTML = '';
  const getTotal = document.querySelector('.total-price');
  getTotal.innerText = 0;
};

window.onload = () => {
  elementItem();
  getCartItems.addEventListener('click', cartItemClickListener);
  getItems.addEventListener('click', addCartElement);
  getCartItems.addEventListener('change', countPrice);
  getEmptyButton.addEventListener('click', emptyCart);
  getSavedCartItems();
  insertp();
  countPrice();
};
