const itemLi = document.querySelector('.cart__item');

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
    item.removeChild(event.target);
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

const addItem = async (event) => {
  const item = getSkuFromProductItem(event.target.parentNode);
  const obj = await fetchItem(item);
  const ol = document.querySelector('.cart__items');
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
  const ol = document.querySelector('.cart__items');
  ol.innerHTML = getSavedCartItems();
  li.forEach((li) => li.addEventListener('click', cartItemClickListener));
};

// function clearCart() {
  // const button = document.querySelector('.empty-cart')
  // const ol = document.querySelectorAll('.cart__items')
  // button.addEventListener('click', () => {

  //   ol.innerHTML = ''
  // })
// }

window.onload = () => { 
  fetchP();
  returnItems();
};
