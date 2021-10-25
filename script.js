const olValue = document.querySelector('.cart__items');

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
// 3 requisito
function cartItemClickListener(event) {
  olValue.removeChild(event.target);
  saveCartItems(olValue.innerHTML);
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  // somaCarrinho(salePrice);
  return li;
}
// ajuda de grupo da mentoria do tales pra pegar o valor do botão criado
const carrinhoItem = async (event) => {
  const pegarSku = getSkuFromProductItem(event.target.parentNode);
  const arrayCar = await fetchItem(pegarSku);
  const carItem = createCartItemElement(arrayCar);
  olValue.appendChild(carItem);
  saveCartItems(olValue.innerHTML);
};

// Requisito 7 do API / para remover a filho da section quando carregar
function criaLoading() {
  const pegaSection = document.querySelector('.loading-container');
  pegaSection.innerHTML = '';
}

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';
  const buttonItem = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  buttonItem.addEventListener('click', carrinhoItem);
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(buttonItem);
  criaLoading();
  return section;
}

const itensCompras = async () => {
  const fetch = await fetchProducts('computador');
  return fetch.results.forEach((item) => {
    const section = document.querySelector('.items');
    const createArr = createProductItemElement(item);
    section.appendChild(createArr);
  });
};
// requisito 4 salvar no navegador
const salvaItem = () => {
  olValue.innerHTML = getSavedCartItems();
  const listLi = document.querySelectorAll('.cart__item');
  listLi.forEach((item) => item.addEventListener('click', cartItemClickListener));
};

// 6 requisito
function removeTudoCar() {
  const limpaCar = document.querySelector('.empty-cart');
  limpaCar.addEventListener('click', () => {
    olValue.innerHTML = '';
  });
}
removeTudoCar();

// function somaCarrinho(param) {
//   const price = document.querySelector('#total__price');
//   let array = [];
//   array = array.push(param);
//   console.log(array);
//   // array.reduce((sum, price) => )
//   // console.log(param);
//   // price.innerText = `Total: ${param}`;
//   ol.appendChild(price);
// }

window.onload = () => { 
  itensCompras();
  salvaItem();
};
