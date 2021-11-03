const cartItems = document.querySelector('.cart__items');
const totalPrice = document.querySelector('.total-price');

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

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

const saveLocalStorage = () => {
  const produto = cartItems.innerHTML;
  saveCartItems(JSON.stringify(produto));
};

const subProducts = (event) => {
  const textProduct = event.target.innerText;
  const arrProduct = textProduct.split(' ');
  const arrLengthPosition = arrProduct[arrProduct.length - 1];
  const valueProduct = arrLengthPosition.replace('$', '');
  let soma = Number(localStorage.getItem('valueProduct'));
  soma -= valueProduct;
  localStorage.setItem('valueProduct', soma);
  totalPrice.innerText = soma;
};

function cartItemClickListener(event) {
  event.target.remove();
  saveLocalStorage();
  subProducts(event);
}

const sumProducts = (price) => {
  let soma = Number(localStorage.getItem('valueProduct'));
  soma += price;
  localStorage.setItem('valueProduct', soma);
  totalPrice.innerText = soma;
};

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  sumProducts(salePrice);
  return li;
}

async function addCartItem(event) {
  const id = getSkuFromProductItem(event.target.parentNode);
  const productElement = await fetchItem(id);
  const createCartItem = createCartItemElement(productElement);
  cartItems.appendChild(createCartItem);
  saveLocalStorage();
}

function createProductItemElement({ sku, name, image }) { 
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

async function searchProducts(product) {
  const searchData = await fetchProducts(product);
  const sectionItems = document.querySelector('.items');
  searchData.results.forEach((item) => {
    const itemObject = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    };
    const productItem = createProductItemElement(itemObject);
    sectionItems.appendChild(productItem);
  });
}

const getLocalStorage = () => {
  const produtos = JSON.parse(getSavedCartItems());
  cartItems.innerHTML = produtos;

  const lis = document.querySelectorAll('.cart__item');
  lis.forEach((li) => li.addEventListener('click', cartItemClickListener));
};

const getValueProductLocalStorage = () => {
  totalPrice.innerHTML = localStorage.getItem('valueProduct');
};

function emptyButton() {
  const btnEmpty = document.querySelector('.empty-cart');
  btnEmpty.addEventListener('click', () => {
    cartItems.innerHTML = '';
    totalPrice.innerText = '';
    localStorage.clear();
  });
}

window.onload = () => {
  searchProducts('computador');
  emptyButton();
  getLocalStorage();
  getValueProductLocalStorage();
};
