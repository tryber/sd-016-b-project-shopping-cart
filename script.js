const ol = document.querySelector('.cart__items');
const li = document.querySelectorAll('.cart__item');

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
function cartItemClickListener(event) {
  const item = document.querySelector('.cart__items');
    item.removeChild(event.target);
    saveCartItems(ol.innerHTML);
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const createLi = document.createElement('li');
  createLi.className = 'cart__item';
  createLi.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  createLi.addEventListener('click', cartItemClickListener);
  return li;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

const addItem = async (event) => {
  const item = getSkuFromProductItem(event.target.parentNode);
  const obj = await fetchItem(item);
  const product = createCartItemElement(obj);
  ol.appendChild(product);
  saveCartItems(ol.innerHTML);
};

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';
  const button = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  button.addEventListener('click', addItem);
  
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(button);
  
  return section;
}

const fetchP = async () => {
  const response = await fetchProducts('computador');
  const obj = await response.results.forEach(async (element) => {
    const section = document.getElementsByClassName('items')[0];
    const result = createProductItemElement(element);
    section.appendChild(result);
  });
  return obj;
};

const returnItems = () => {
  ol.innerHTML = getSavedCartItems();
  li.forEach((item) => item.addEventListener('click', cartItemClickListener));
};

  const button = document.querySelector('.empty-cart');
  button.addEventListener('click', () => {
    ol.innerHTML = '';
    saveCartItems(ol.innerHTML);   
  });

window.onload = () => {
  fetchP();
  returnItems(); 
};
