// const { fetchProducts } = require("./helpers/fetchProducts");

// const getSavedCartItems = require("./helpers/getSavedCartItems");

// const saveCartItems = require('./helpers/saveCartItems');

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

// Requisito 5
async function sumItemPrices() {
  const liList = document.getElementsByTagName('li');
  const totalPrice = document.querySelector('.total-price');
  let totalValue = 0;
  // if (liList.length === 0) {
  //   totalPrice.innerText = 'Valot total: 0';
  // }
  for (let index = 0; index < liList.length; index += 1) {
    const li = liList[index];
    const price = parseFloat(li.innerText.split('|')[2].split('$')[1]);
    // console.log(price);
    totalValue += price;    
  }
  totalPrice.innerText = `Valor total: ${totalValue}`;    
}
// Criando o código que vai selecionar o item
// Salvando no localstorage
const items = document.querySelector('.items');
items.addEventListener('click', async (event) => {
  const itemId = event.target.parentNode.firstChild.innerText;
  const cartListAsync = document.querySelector('.cart__items');
  const addItem = await searchItem(itemId);  
  cartList.appendChild(addItem);
  saveCartItems(cartListAsync.innerHTML);
  sumItemPrices();
  // let totalValue += await sumItemPrices(itemId);
  // totalValue += await sumItemPrices(itemId);
  // console.log(totalValue);
  // totalValue += sumItemPrices(itemId);
  // console.log(totalValue);
});

// Requisito 3
cartList.addEventListener('click', async (event) => {
  cartItemClickListener(event);
  });

window.onload = async () => { 
  searchProducts('computador');  
  cartList.innerHTML = getSavedCartItems();
    // console.log(cartList.innerHTML);  
  // const totalValue = 0;
  sumItemPrices();
};
