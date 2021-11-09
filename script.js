const getEmptyButton = document.querySelector('.empty-cart');

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

function cartItemClickListener(event) {
  event.target.remove();
  saveCartItems();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function cartOn() {
  const productItem = document.querySelector('.items');
  const load = document.createElement('h2');
  load.className = 'loading';
  productItem.appendChild(load);
  load.innerText = 'carregando...';
}

function cartOff() {
  const load = document.querySelector('.loading');
  load.remove();
}

async function searchId(id) {
  cartOff();
  const findId = await fetchItem(id);
  const cartItem = document.querySelector('.cart__items');

  const obj = {      
    sku: findId.id,
    name: findId.title,
    salePrice: findId.price,
  };
  const createCartItem = createCartItemElement(obj);
  cartItem.appendChild(createCartItem);
  cartOn();
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
    saveCartItems(); 
  });
  createEventListener();
}

getEmptyButton.addEventListener('click', () => {
  document.getElementsByClassName('cart__items')[0].innerText = '';
});

window.onload = () => {
  searchProduct('computador');  
  getSavedCartItems();
};
