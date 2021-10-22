function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function cartItemClickListener(event) {

}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  console.log(li);
  return li;
}

const cartItems = document.querySelector('.cart__items');
function inputCartIntem(object) {
  console.log(object);
  cartItems.appendChild(createCartItemElement(object));
}

async function createCartItem(element) {
  const resultFetch = await fetchItem(element);
  console.log(resultFetch);
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
  const resultFetch = await fetchProducts(itens);
   const retorno = resultFetch.results.map((value) => ({
    sku: value.id,
    name: value.title,
    image: value.thumbnail,
  }));
  const items = document.querySelector('.items');
  retorno.forEach((value) => {
    items.appendChild(createProductItemElement(value));
  }); 
};

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

window.onload = () => { 
  createIten('computador');
};
