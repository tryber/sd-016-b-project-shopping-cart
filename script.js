const ol = document.querySelector('.cart__items');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}
//   const list = '<li class="cart__item">SKU: MLB1532308540 | NAME: Computador Completo Fácil Intel I3 04 Gb Ddr3 Ssd 120 Gb | PRICE: $2079</li><li class="cart__item">SKU: MLB1607748387 | NAME: Pc Computador Cpu Intel Core I5 + Ssd 240gb, 8gb Memória Ram | PRICE: $1699.99</li>';
//   const price = Number(list.split('$').pop())
//   console.log(price);

// function totalPrice() {
// const listItems = document.getElementsByClassName('cart__item');

// for (let i = 0; i < listItems.length; i += 1) {
//   const arr = [];
//   let string = listItems[i].innerText;

//   let priceRegex = /PRICE:([0-12]+)/
//   let match = string.match(priceRegex);
//   arr.push(match[1])
// }
// return arr;

// };

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
  });

window.onload = () => {
  fetchP();
  returnItems();
};
