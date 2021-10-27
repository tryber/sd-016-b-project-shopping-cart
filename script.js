const ol = document.querySelector('.cart__items');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function totalPrice() {
  const totalHTML = document.querySelector('.total-price');
  let total = 0;
  const liCart = document.querySelectorAll('.cart__item');
  for (let i = 0; i < liCart.length; i += 1) {
    total += Number(liCart[i].innerText.split('$').pop());
    // Créditos da idéia do método de pegar os preços ao Gabriel Pinheiro.
  }
  totalHTML.innerText = total;
}

function removeLoading() {
  const section = document.querySelector('#remove');
  section.innerHTML = '';
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
    totalPrice();
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
  const product = createCartItemElement(obj);
  ol.appendChild(product);
  saveCartItems(ol.innerHTML);
  totalPrice();
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
  removeLoading();
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
  const lis = document.querySelectorAll('.cart__item');
  lis.forEach((li) => li.addEventListener('click', cartItemClickListener));
};

  const button = document.querySelector('.empty-cart');
  button.addEventListener('click', () => {
    ol.innerHTML = '';
    saveCartItems(ol.innerHTML);   
    totalPrice();
  });

window.onload = () => {
  fetchP();
  returnItems();
  totalPrice();
};
