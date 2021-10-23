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

function buttonRm(event) {
  return event.target.remove();
}

function cartItemClickListener(event) {
  // coloque seu código aqui
  const cartItem = document.querySelectorAll('.cart__item');
  cartItem.forEach((item) => {
    item.addEventListener('click', buttonRm(event));
  });
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function totalPrice() {
  const cartItem = document.querySelectorAll('.cart__item');
  let count = 0;  
  cartItem.forEach((item) => {    
    const splitString = item.innerText.split(' ');
    const priceString = splitString.at(-1);
    const priceWithoutChar = priceString.replace('$', '');
    const priceInteger = parseInt(priceWithoutChar, 10);    
    count += priceInteger;    
  });
  console.log(count);
}

async function searchId(id) {
  const findId = await fetchItem(id);
  const cartItem = document.querySelector('.cart__items');
  const obj = {      
    sku: findId.id,
    name: findId.title,
    salePrice: findId.price,
  };
  const createCartItem = createCartItemElement(obj);  
  cartItem.appendChild(createCartItem);
  totalPrice();
  return findId;
}

function createEventListener() {
  const buttons = document.querySelectorAll('.item__add');
  buttons.forEach((button) => button.addEventListener('click', (event) => {
    const id = event
      .target.previousElementSibling.previousElementSibling.previousElementSibling.innerText;
    searchId(id);    
  }));  
}

async function searchProduct(product) {
  const searchData = await fetchProducts(product);
  const sectionItem = document.querySelector('.items');
  searchData.results.forEach((item) => {
    const obj = {      
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    };
    const productItem = createProductItemElement(obj);
    sectionItem.appendChild(productItem);    
  });
  createEventListener();  
}

window.onload = () => {
  searchProduct('computador');  
};
