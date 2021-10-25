const items = document.querySelector('.items');
const cartItem = document.querySelector('.cart__items');
const sumPrices = document.querySelector('.total-price');
const cartEmpty = document.querySelector('.empty-cart');

const emptyCart = () => {
  cartItem.innerHTML = ' ';
  sumPrices.innerHTML = '0';
  saveCartItems(cartItem.innerHTML);
};

cartEmpty.addEventListener('click', emptyCart);

const totalPriceUpdate = () => {
  let value = 0;
  for (let i = 0; i < cartItem.children.length; i += 1) {
    const somar = cartItem.children[i]; 
    console.log(somar.innerText.split('PRICE: ')[1]);
    value += Number(somar.innerText.split('PRICE: ')[1]);
  }
  sumPrices.innerHTML = `${parseFloat(value)}`;
};

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

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  
  return section;
}

const showLoadMessage = () => {
  const loadMessage = document.createElement('div');
  loadMessage.classList.add('loading');
  loadMessage.innerText = 'carregando...';
  document.querySelector('body').appendChild(loadMessage);
};

const hideLoadMessage = () => {
  document.querySelector('.loading').remove();
};

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

function cartItemClickListener(event) {
  event.target.remove();
  saveCartItems(cartItem.innerHTML);
  totalPriceUpdate();
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: ${salePrice
  }`;
  return li;
}
const loadStorage = () => {
  const loading = getSavedCartItems();
  if (typeof loading !== 'undefined') {
    cartItem.innerHTML = loading; 
  }
  totalPriceUpdate();
};  

async function searchProducts(product) {
   showLoadMessage();
   const searchData = await fetchProducts(product);
   hideLoadMessage();
   searchData.results.forEach((result) => {
   const itemObject = createProductItemElement(result);
   items.appendChild(itemObject);
  });
}

async function putItemCart(id) {
  const products = await fetchItem(id);
  const putCartItem = createCartItemElement(products);
  cartItem.appendChild(putCartItem);
  saveCartItems(cartItem.innerHTML);
  totalPriceUpdate();
}
const putProduct = (event) => {
  if (event.target.classList.contains('item__add')) {
    const id = event.target.parentElement.childNodes[0].innerText;
    putItemCart(id);
   }
};

window.onload = () => { 
  searchProducts('computador');
  items.addEventListener('click', putProduct);
  cartItem.addEventListener('click', cartItemClickListener);
  loadStorage();
 }; 