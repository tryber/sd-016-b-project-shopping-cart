const empty = document.querySelector('.empty-cart');
const items = document.querySelector('.items');
const cartItem = document.querySelector('.cart__items');

function emptyCart() {
  cartItem.innerHTML = '';
  saveCartItems(cartItem.innerHTML);
}

empty.addEventListener('click', emptyCart);

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
  // const button = document.querySelectorAll('.item_add')
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

async function cartItemClickListener(event) {
  // coloque seu código aqui
  return event.target.remove();
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.setAttribute('price', salePrice);
  return li;
}

async function searchObject(products) {
  const objectList = await fetchProducts(products);
  console.log(objectList);
  const section = document.querySelector('.items');
objectList.results.forEach((item) => {
  const object = {
  sku: item.id,
  name: item.title,
  image: item.thumbnail,
  };
  const listProduct = createProductItemElement(object);
  section.appendChild(listProduct);
});
}

async function searchItem(id) {
  const objectItem = await fetchItem(id);
  const productAdd = createCartItemElement(objectItem);
  console.log(productAdd);
    cartItem.appendChild(productAdd);
    saveCartItems(cartItem.innerHTML);
}

function getID(e) {
  if (e.target.classList.contains('item__add')) {
    id = e.target.parentNode.firstChild.innerText;
    searchItem(id);
  }
}

function carregandoPagina() {
  const itemSalvos = getSavedCartItems();
  cartItem.innerHTML = itemSalvos;
}

window.onload = () => { 
searchObject('computador');
items.addEventListener('click', getID);
cartItem.addEventListener('click', cartItemClickListener);
carregandoPagina();
};