// const totalPriceHtml = (num) => {
//   // console.log(num);
//   const priceTag = document.querySelector('.total-price');
//   priceTag.innerText = num.toFixed(2);
// };

// totalPriceHtml(0);

const appendSum = () => {
  const father = document.querySelector('.cart');
  const div = document.createElement('div');
  father.appendChild(div);
  div.className = 'total-price';
};

// Como referência o código do amigo Gabriel Pinheiro, que usou como fonte https://stackoverflow.com/questions/37556240/get-everything-after-first-character
const totalPrice = () => {
  const totalDiv = document.querySelector('.total-price');
  let sum = 0;
  const cartItems = document.getElementsByClassName('cart__item');
  for (let i = 0; i < cartItems.length; i += 1) {
    sum += Number(cartItems[i].innerHTML.split('$').pop());
  }
  totalDiv.innerHTML = sum;
};

const localStorageNull = () => {
  if (localStorage.getItem('cartItems') === null) localStorage.setItem('cartItems', '[]');
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
  const parentSection = document.querySelector('.items');
  
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  parentSection.appendChild(section);

  // return section;
}

const createProductRotation = async () => {
  const itensArray = await fetchProducts('computador');
  itensArray.results.forEach((item) => createProductItemElement(item));
};

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

const currentOl = () => document.querySelector('.cart__items');

function cartItemClickListener(event) {
  // coloque seu código aqui
  event.target.remove();
  saveCartItems(currentOl().innerHTML);
  totalPrice();
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  const cart = document.querySelector('.cart__items');

  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  cart.appendChild(li);
  saveCartItems(currentOl().innerHTML);
  totalPrice();
}

const addToCart = () => {
  const buttons = document.querySelector('.items');
  buttons.addEventListener('click', (event) => {
    if (event.target.className !== 'item__add') return;
    const idByParent = event.target.parentNode.querySelector('.item__sku').innerText;
    fetchItem(idByParent).then((data) => createCartItemElement(data));
  });
};

const cartOnRefresh = async () => {
  const currOl = currentOl();
  currOl.innerHTML = await getSavedCartItems();
  const childrenOfOl = currOl.children;
  for (let i = 0; i < childrenOfOl.length; i += 1) {
    childrenOfOl[i].addEventListener('click', cartItemClickListener);
  }
  totalPrice();
};

const emptyCartBtn = () => {
  const button = document.querySelector('.empty-cart');
  const nodeFather = currentOl();
  button.addEventListener('click', () => {
    nodeFather.innerHTML = '';
    totalPrice();
    localStorage.setItem('cartItems', '[]');
  });
};

window.onload = () => {
  localStorageNull();
  createProductRotation();
  addToCart();
  cartOnRefresh();
  appendSum();
  emptyCartBtn();
};
