const getOl = document.querySelector('.cart__items');
const getTotalPrice = document.querySelector('.total-price');
const getEmpyCartButton = document.querySelector('.empty-cart');
const getLoadingSec = document.querySelector('.loadingSec');
let values = 0;

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

const RemLoading = () => { 
  getLoadingSec.innerHTML = ''; 
};
function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
} 

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

const sumProductsPrice = (price) => {
  values += price;
  getTotalPrice.innerText = values;
};

const subProductsPrice = (price) => {
  values -= price;
  getTotalPrice.innerText = values;
};

function cartItemClickListener(event) {
  const eventTarget = event.target.innerText;
  const getPrice = Number(eventTarget.split('$')[1]);
  subProductsPrice(getPrice);
  getOl.removeChild(event.target);
  saveCartItems(getOl.innerHTML);
}

const eventLi = () => {
  getOl.innerHTML = getSavedCartItems();
  const getAllLi = document.querySelectorAll('.cart__item');
  getAllLi.forEach((element) => element.addEventListener('click', cartItemClickListener));
};

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
} 

async function addProductToCart(event) {
  const getSKU = getSkuFromProductItem(event.target.parentNode);
  const getArr = await fetchItem(getSKU);
  const getCartItens = createCartItemElement(getArr);
  getOl.appendChild(getCartItens);
  sumProductsPrice(getArr.price);
  saveCartItems(getOl.innerHTML);
}

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';
  const newButton = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
newButton.addEventListener('click', addProductToCart);
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(newButton);
  RemLoading();

  return section;
}

const objectF = async () => {
  const arrProducts = await fetchProducts('computador');
  arrProducts.forEach((arr) => {
    const getItens = document.querySelector('.items');
    const createArray = createProductItemElement(arr);
    getItens.appendChild(createArray);
  });
};

getEmpyCartButton.addEventListener('click', () => {
  getOl.innerHTML = '';
  getTotalPrice.innerText = '';
  saveCartItems(getOl.innerHTML);
});
window.onload = () => {
objectF();
eventLi();
 };