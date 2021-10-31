// const saveCartItems = require("./helpers/saveCartItems");
// const { fetchProducts } = require('./helpers/fetchProducts');

// const getSavedCartItems = require("./helpers/getSavedCartItems");

const ol = document.querySelector('.cart__items');
const emptyBotton = document.querySelector('.empty-cart');
// const saveCartItems = require("./helpers/saveCartItems");

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

// let getID = () => {};

function cartItemClickListener(event) {
  event.target.remove();
  localStorage.clear();
  saveCartItems(ol.innerHTML);
}
function createCartItemElement(sku, name, salePrice) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  ol.appendChild(li);
  saveCartItems(ol.innerHTML);
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function addElementCart(result) {
  const salePrice = result.price;
  const titles = result.title;
  const ids = result.id;
  createCartItemElement(ids, titles, salePrice);
}

async function getID(event) {
  const ids = event.target.parentNode.firstChild.innerText;
  // console.log(await fetchItem(ids));
  addElementCart(await fetchItem(ids));

  return ids; 
}
function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const boton = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  boton.addEventListener('click', getID);

  section.appendChild(boton);

  return section;
}

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

// function cartItemClickListener(event) {
//   event.target.remove();
//   localStorage.clear();
//   saveCartItems(ol.innerHTML);
// }

// function createCartItemElement(sku, name, salePrice) {
//   const li = document.createElement('li');
//   li.className = 'cart__item';
//   li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
//   ol.appendChild(li);
//   saveCartItems(ol.innerHTML);
//   li.addEventListener('click', cartItemClickListener);
//   return li;
// }
// function addElementCart(result) {
//   const salePrice = result.price;
//   const titles = result.title;
//   const ids = result.id;
//   createCartItemElement(ids, titles, salePrice);
// }
// async function getID(event) {
//   const ids = event.target.parentNode.firstChild.innerText;
//   // console.log(await fetchItem(ids).then((x) => x.id));
//   addElementCart(await fetchItem(ids).then((x) => x));

//   return ids; 
// }
// getID = (event) => {
//   const ids = event.target.parentNode.firstChild.innerText;
//   // fetchItem(ids, addElementCart);
  
//   console.log(fetchItem(ids).then((x) => x.id));
//   const { id } = fetchItem(ids);
//   console.log(id);
//   return ids; 
// };
async function showData() { 
  const { results } = await fetchProducts('computador');
  // console.log(results);
  for (let index = 0; index < results.length; index += 1) {
    // const thumbnail = results.map((element) => element.thumbnail)[index];
    // const title = results.map((element) => element.title)[index];
    // const id = results.map((element) => element.id)[index];
    const { id, title, thumbnail } = results[index];
    // const obj = { id, title, thumbnail };

    const items = document.querySelector('.items');
    
    items.appendChild(createProductItemElement({ id, title, thumbnail }));
  }
}
  fetchProducts();
  function emptyCart() {
    ol.innerHTML = '';
    localStorage.clear();
  }
  emptyBotton.addEventListener('click', emptyCart);
 
  window.onload = () => {
    showData();
    // getSavedCartItems('cartItems');
   };
  //  module.exports = { addElementCart };