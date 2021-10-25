const items = document.querySelector('.items');
const cartItem = document.querySelector('.cart__items');
const cartEmpty = document.querySelector('.empty-cart');

const emptyCart = () => {
  cartItem.innerHTML = ' ';
  saveCartItems(cartItem.innerHTML);
};

cartEmpty.addEventListener('click', emptyCart);

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

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}
function cartItemClickListener(event) { 
  event.target.remove();
  saveCartItems(cartItem.innerHTML);
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;    
  return li;
}

const loadStorage = () => {
  const loading = getSavedCartItems();
  if (loading) {
    cartItem.innerHTML = loading;
  }
};

const addItemOnCart = async () => {
  const clickedProduct = await fetchItem(sku);

  const itemAdd = createCartItemElement(clickedProduct);
  cartItem.appendChild(itemAdd);
};

const productsArray = async () => {
  const products = await fetchProducts('computador');
  const itemsElem = document.getElementsByClassName('items')[0];
  products.results.forEach((product) => {
    const products2 = createProductItemElement(product);
    itemsElem.appendChild(products2);
    saveCartItems(cartItem.innerHTML);
  });
};

async function putItemOnCart(id) {
  const products = await fetchItem(id);
  const putCartItem = createCartItemElement(products);
  cartItem.appendChild(putCartItem);
}

const putProduct = (event) => {
  if (event.target.classList.contains('item__add')) {
    const id = event.target.parentElement.childNodes[0].innerText;
    putItemOnCart(id);
  }
};

window.onload = () => {
  productsArray();
  items.addEventListener('click', putProduct);
  cartItem.addEventListener('click', cartItemClickListener);
  loadStorage();
 };
