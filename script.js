const getCartSpace = document.querySelector('.cart__items');

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

const priceItems = (cartItemString) => {
  const splitStr = cartItemString.substring(cartItemString.indexOf('$') + 1); 
  const price = parseFloat(splitStr);
  return price;
  // retirei parte do código do site: https://www.codegrepper.com/code-examples/javascript/get+string+after+specific+character+javascript
};

const getCartPricesArray = () => {
  const cartItems = document.querySelectorAll('.cart__item');
  const newArray = [];
  for (let index = 0; index < cartItems.length; index += 1) {
    newArray.push(priceItems(cartItems[index].innerHTML));
  }
  return newArray;
};

const sumCartItems = () => {
  const getdiv = document.querySelector('.total-price');
  const cartItems = document.querySelectorAll('.cart__item');
  if (getCartPricesArray().length > 0) {
    const returnedPrice = getCartPricesArray().reduce((acc, cur) => acc + cur);
    getdiv.innerHTML = returnedPrice;
  }
  if (cartItems.length === 0) {
    getdiv.innerHTML = '';
  }
};

function cartItemClickListener(event) {
  // coloque seu código aqui
  event.target.remove();
  saveCartItems();
  sumCartItems();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const getCartItems = async (event) => {
  const parent = await event.target.parentNode;
  const firstSibiling = await parent.firstChild.innerText;
  const element = await fetchItem(firstSibiling);
  getCartSpace.appendChild(createCartItemElement(element));
  saveCartItems();
  sumCartItems();
};

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  const itemButtons = document.querySelectorAll('.item__add');
  for (let index = 0; index < itemButtons.length; index += 1) {
    itemButtons[index].addEventListener('click', getCartItems);
  }
  return section;
}

const filterElementItems = async () => {
  const ListaDeItems = await fetchProducts('computador');
  const data = await ListaDeItems;
  const selectClass = document.querySelector('.items');
  const getAPIElements = await data.forEach((element) => {
    const { id, title, thumbnail } = element;
    const elements = { sku: id, name: title, image: thumbnail };
    selectClass.appendChild(createProductItemElement(elements));
  });
  return getAPIElements;
};
filterElementItems();

const removeCartItems = () => {
  const getdiv = document.querySelector('.total-price');
  getCartSpace.innerHTML = '';
  saveCartItems();
  getdiv.innerHTML = '';
};

const cartItemsListener = () => {
  const getAllCartItems = document.querySelectorAll('.cart__items');
  for (let index = 0; index < getAllCartItems.length; index += 1) {
    getAllCartItems[index].addEventListener('click', cartItemClickListener);
  }
};

const getRemoveButton = document.querySelector('.empty-cart');
getRemoveButton.addEventListener('click', removeCartItems);

window.onload = () => {
  getSavedCartItems();
  cartItemsListener();
  sumCartItems();
};
