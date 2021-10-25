// const { fetchProducts } = require("./helpers/fetchProducts");

// const { fetchItem } = require("./helpers/fetchItem");
// console.log(buscarItem);

const cartList = document.querySelector('.cart__items');

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
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

async function cartItemClickListener(event) {
  // console.log(event);
  cartList.removeChild(event.target);
}

async function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  // li.addEventListener('click', cartItemClickListener);
  return li;
}

async function searchProducts(product) {
  const searchData = await fetchProducts(product);
  const sectionItem = document.querySelector('.items');
  searchData.results.forEach((item) => {
    const itemObj = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    };
    // const { id: sku, title: name, thumbnail: image} = item;
    const productItem = createProductItemElement(itemObj);
    sectionItem.appendChild(productItem);
  });
}

// requisito 2 - chamando o item
async function searchItem(itemId) {
  const item = await fetchItem(itemId);
  // console.log(item.title);
  const { id: sku, title: name, price: salePrice } = item;
  const itemToCreate = await createCartItemElement({ sku, name, salePrice });
  // console.log(itemToCreate);
  return itemToCreate;  
}

// Criando o código que vai selecionar o item
const items = document.querySelector('.items');
items.addEventListener('click', async (event) => {
  const itemId = event.target.parentNode.firstChild.innerText;
  // console.log(itemId);
  const addItem = await searchItem(itemId);
  // console.log(addItem);
  // const cartList = document.querySelector('.cart__items');
  cartList.appendChild(addItem);
});

// Requisito 3
cartList.addEventListener('click', async (event) => {
  cartItemClickListener(event);
  });

window.onload = () => { 
  searchProducts('computador');
};
