const cartItem = document.querySelector('.cart__items');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function getSaveSumPrice() {
  const getSaveSum = localStorage.getItem('sumPrice');
  const price = document.querySelector('.total-price');
  price.innerText = getSaveSum;
}

function saveSumPrice(param) {
  localStorage.setItem('sumPrice', param);
}

function sumPrice() {
  const carts = document.querySelectorAll('.cart__item');
  console.log(carts);
  let result = 0;
  carts.forEach((cart) => {
    console.log(cart.innerText.split('$').pop());
    result += Number(cart.innerText.split('$').pop());
  });
  saveSumPrice(result);
  const price = document.querySelector('.total-price');
  price.innerText = result;
} 

function cartItemClickListener(event) {
  event.target.remove();
  saveCartItems(cartItem.innerHTML);
  sumPrice();
}

function deleteItemCart() {
  const li = document.querySelectorAll('.cart__item');
  for (let index = 0; index < li.length; index += 1) {
    li[index].addEventListener('click', cartItemClickListener);
  }
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const cartItems = document.querySelector('.cart__items');
function inputCartIntem(object) {
  cartItems.appendChild(createCartItemElement(object));
  saveCartItems(cartItem.innerHTML);
  sumPrice();
}

async function createCartItem(id) {
  const resultFetch = await fetchItem(id);
  inputCartIntem(resultFetch);
}

// Tive a ajuda do Gbriel pinheiro no reuisito 2 para entender e desenvolver.
function idElement(event) {
  const idEvent = event.target
    .parentElement
    .firstElementChild
    .innerText;
  createCartItem(idEvent);
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  if (element === 'button') {
    e.addEventListener('click', idElement);
  }
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

// Tive a ajuda do monitor Tales, Mariana e do Gabriel para entender e desenvolver esse parte do codigo.
const createIten = async (itens) => {
  /* const divLoading = document.createAttribute('div');
  divLoading.className = 'loading';
  divLoading.innerText = 'Carregando...';
  document.querySelector('body').appendChild(divLoading);
  console.log(divLoading); */
  const resultFetch = await fetchProducts(itens);
   const retorno = resultFetch.results.map((value) => ({
    sku: value.id,
    name: value.title,
    image: value.thumbnail,
  }));
  /* document.querySelector('.loading').remove();  */
  const items = document.querySelector('.items');
  retorno.forEach((value) => {
    items.appendChild(createProductItemElement(value));
  });
};

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

const btn = document.querySelector('.empty-cart');
function btnCleanCartItem() {
  cartItem.innerHTML = '';
  saveCartItems(cartItem.innerHTML);
  sumPrice();
}

window.onload = () => { 
  createIten('computador');
  getSavedCartItems();
  getSaveSumPrice();
  deleteItemCart();
  btn.addEventListener('click', btnCleanCartItem);
};
